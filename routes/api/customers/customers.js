const express = require("express");
const router = express.Router();
const pbkdf2 = require("pbkdf2");
const { new_code, send_mail, verify_code } = require('../../libs/verification')
const { signupValidate } = require('../../libs/validate')
const { validateToken, } = require('../../libs/authentication')
var passwordValidator = require('password-validator');
var pschema = new passwordValidator();
const {
    createUser,
    getUserByUsername,
    get_user,
    getUserByUpdate,
    getUserByEmail
} = require("./customer_model");

router.post("/sign-up",
    signupValidate(),
    (req, res) => {
        let password = pbkdf2.pbkdf2Sync(
            req.body.password,
            "salt",
            1,
            32,
            "sha512"
        );
        createUser({
            phone: req.body.phone,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password.toString(),
        }, (err, data) => {
            console.log('data data data====', data)
            if (err) {
                res.json({
                    error: "error_request",
                    error_description: err
                });
                res.status(400);
                return;
            }
            res.json({ message: "Account created." })
        })
    })
router.post("/get-profile",
    validateToken(),
    (req, res) => {
        get_user(res.locals.token.user_id)
            .then((user) => {
                if (!user) {

                    res.json({
                        error: "Invalid request",
                        error_description: "User not found.",
                    });
                    res.status(400);
                    return;
                }
                res.json({ user });
            })
            .catch((err) => {

                res.json({
                    error: "Invalid request",
                    error_description: "Unable to find user",
                });
                res.status(400);
                return
            });
    });


router.post('/send-instruction', (req, res) => {
    if (!req.body.email) {
        res.json({ error: 'invalid_details', error_description: "Email is required." })
        return
    }
    getUserByEmail(req.body.email, (err, data) => {
        if (err) {

            res.json({
                error: "error_request",
                error_description: err,
            });
            res.status(400);
            return;
        }
        console.log('data data==>', data)
        if (!data) {
            res.json({
                error: "error_request",
                error_description: 'Plase use valid mail.',
            });
            res.status(400);
            return;
        }
        new_code(req.body.email, (err, code) => {
            if (err) {
                res.json({
                    error: "error_request",
                    error_description: err,
                });
                res.status(400);
                return;
            }
            console.log('code code==>', code)
            var message_sent = req.protocol + '://' + req.hostname + "/reset-password?verify=" + code.code
            send_mail(req.body.email, 'Password recovery', message_sent,)
                .then((datasmail) => {
                    res.json({ message: "An instructions to reset password has been sent to registered email." })
                })

        })
    })
})
router.post("/reset-password",
    verify_code(),
    (req, res) => {

        if (!req.body.new_password) {
            res.json({
                error: "error_request",
                error_description: "Password is rquired.",
            });
            res.status(400);
            return;
        }

        var nam = pschema.validate(req.body.new_password, { list: true })
        if (nam.length > 0) {

            res.json({
                error: "error_request",
                error_description: "Password contain atleast one " + nam[0] + " required."
            });
            res.status(400);
            return;
        }
        if (!req.body.confirm_password) {

            res.json({
                error: "error_request",
                error_description: "Confirm password is rquired.",
            });
            res.status(400);
            return;
        }
        if (req.body.confirm_password != req.body.new_password) {

            res.json({
                error: "error_request",
                error_description: "New password and Confirm password should be same.",
            });
            res.status(400);
            return;
        }
        let password = pbkdf2.pbkdf2Sync(
            req.body.new_password,
            "salt",
            1,
            32,
            "sha512"
        );
        getUserByEmail(res.locals.code.email, (err, data) => {
            if (err) {

                res.json({
                    error: "error_request",
                    error_description: err,
                });
                res.status(400);
                return;
            }
            if (!data) {

                res.json({
                    error: "error_request",
                    error_description: 'Invalid user.',
                });
                res.status(400);
                return;
            }
            getUserByUpdate(data._id, { password: password }, (err, data) => {
                if (err) {

                    res.json({
                        error: "error_request",
                        error_description: err,
                    });
                    res.status(400);
                    return;
                }

                res.json({
                    message: 'Password changes.'
                });
                res.status(200);
                return;
            })

        })
    })
module.exports = router;