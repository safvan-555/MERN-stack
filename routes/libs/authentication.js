
const { v4: refreshToken } = require("uuid");
const jwt = require("jsonwebtoken");
var config = require('../../config.json')
const tokensModel = require("../api/auth/token_model");

exports.tokenGen = function (userId) {
    return new Promise(async (resolve, reject) => {
        let refresh_token = refreshToken();
        let iat = new Date().getTime();
        let token = {
            refresh_token: refresh_token,
            iat: iat,
            user_id: userId,
        };
        let access_token = jwt.sign(token, config.JWTSECRET);
        tokensModel.newToken(token, (err, tokenInfo) => {
            if (err) {
                reject("Unable to issue token");
                res.status(400);
                return;
            }
            token.accessToken = access_token;
            resolve(token);
        });
    })
}
module.exports.validateRefreshToken = function (refresh_token) {
    return new Promise(async (resolve, reject) => {
        let tokenInfo = await tokensModel.getTokenByRefreshtoken(refresh_token);
        if (!tokenInfo) {
            reject("Invalid refresh token");
            res.status(400);
            return;
        }
        resolve(tokenInfo);
    });
};

module.exports.updateToken = function (token) {
    return new Promise((resolve, reject) => {
        let iat = new Date().getTime();
        token.iat = iat;
        tokensModel.update(token._id, token, (err, tokenInfo) => {
            if (err) {
                reject("Unable to issue token");
                res.status(400);
                return;
            }
            let tokenSignDetails = {
                refresh_token: tokenInfo.refresh_token,
                iat: iat,
                user_id: tokenInfo.user_id,
            };
            token.accessToken = jwt.sign(tokenSignDetails, config.JWTSECRET);
            resolve(token);
        });
    });
};
module.exports.validateToken = function () {
    return async function (req, res, next) {

        if (!req.headers.authorization) {

            res.json({
                error: "Invalid request",
                error_description: "access token is required",
            });
            res.status(400);
            return;
        }
        let access_token = req.headers.authorization.split(" ")[1];
        console.log('authorization--->', access_token)
        //veify JWT Token
        jwt.verify(access_token, config.JWTSECRET, function (err, tokenInfo) {
            if (err) {
                res.json({
                    error: "Authentication failed",
                    error_description: "Invalid access token",
                });
                res.status(400)
                return
            }
            res.locals.token = tokenInfo;
            next();
        });
    };
};
module.exports.
    invalidateToken = function (refresh_token) {
        return new Promise(async (resolve, reject) => {
            tokensModel.deleteRefreshtoken(refresh_token, (err, response) => {
                resolve("done");
            });
        });
    };