const express = require("express");
const router = express.Router();
const pbkdf2 = require("pbkdf2");
const { getUserByPhone } = require("../customers/customer_model");
const { tokenGen, validateRefreshToken, updateToken, validateToken, invalidateToken } = require('../../libs/authentication')

router.post("/login", (req, res) => {
    let { refresh_token, phone, password } = req.body;
    if (refresh_token) {
        if (!refresh_token) {
            res.json({
                error: "authentication_error",
                error_description: "Refresh token is required",
            });
            res.status(400)
            return;
        }
        validateRefreshToken(refresh_token)
            .then((tokenInfo) => {

                updateToken(tokenInfo)
                    .then((newToken) => {
                        delete newToken._id;
                        delete newToken.__v;
                        res.json(newToken);
                    })
                    .catch((e) => {
                        res.json({
                            error: "authentication_error",
                            error_description: "Unable to issue token",
                        });
                        res.status(402);
                        return;
                    });
            })
            .catch((e) => {

                res.json({
                    error: "authentication_error",
                    error_description: "Invalid refresh token",
                });
                res.status(400);
                return;
            });
    } else {
        if (!(phone && password)) {
            res.json({
                error: "authentication_error",
                error_description: "Phone and password is required",
            });
            res.status(400)
            return;
        }
        getUserByPhone(req.body.phone, (err, user) => {
            if (err) {

                res.json({
                    error: "authentication_error",
                    error_description: err,
                });
                res.status(400);
                return;
            }
            if (!user) {
                res.json({
                    error: "authentication_error",
                    error_description: "Invalid User.",
                });
                res.status(400)
                return;
            }
            let inputpassword = pbkdf2
                .pbkdf2Sync(password, "salt", 1, 32, "sha512")
                .toString();
            if (user.password != inputpassword) {

                res.json({
                    error: "authentication_error",
                    error_description: "Invalid password",
                });
                res.status(400);
                return;
            }
            tokenGen(user._id)
                .then((token) => {
                    res.json(token);
                })
                .catch((e) => {
                    console.log("err", e);
                    res.json({
                        error: "authentication_error",
                        error_description: "Unable to generate token",
                    });
                    res.status(402);
                    return;
                });
        })
    }
})
router.post(
    "/token-info",
    validateToken(),
    (req, res) => {
        let token = res.locals.token;
        delete token._id;
        delete token.__v;
        res.json({ message: "access token verified", token });
    }
);
router.post("/logout",
    validateToken(),
    (req, res) => {
        invalidateToken(res.locals.token.refresh_token)
            .then((response) => {
                res.json({ message: "loged Out successfully" });
            })
            .catch((err) => {
                res.json({
                    error: "System error",
                    error_description: "Unable to process the request",
                });
                res.status(403);
                return
            });
    });
module.exports = router;