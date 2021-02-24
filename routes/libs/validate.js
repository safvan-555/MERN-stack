const { getUserByPhone, getUserByEmail } = require('../api/customers/customer_model')
var passwordValidator = require('password-validator');
var pschema = new passwordValidator();
module.exports.signupValidate = function () {
    return function (req, res, next) {
        if (!req.body.firs_tname) {
            res.json({
                error: "error_request",
                error_description: "First Name is rquired.",
            });
            res.status(400);
            return;
        }
        if (!req.body.last_name) {
            res.json({
                error: "error_request",
                error_description: "Last Name is rquired.",
            });
            res.status(400);
            return;
        }
        if (!req.body.email) {

            res.json({
                error: "error_request",
                error_description: "Mail is rquired.",
            });
            res.status(400);
            return;
        }
        if (!req.body.phone) {

            res.json({
                error: "error_request",
                error_description: "Phone is rquired.",
            });
            res.status(400);
            return;
        }
        if (!req.body.password) {

            res.json({
                error: "error_request",
                error_description: "Password is rquired.",
            });
            res.status(400);
            return;
        }

        var nam = pschema.validate(req.body.password, { list: true })
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
        if (req.body.confirm_password != req.body.password) {

            res.json({
                error: "error_request",
                error_description: "Password and Confirm password should be same.",
            });
            res.status(400);
            return;
        }
        getUserByPhone(req.body.phone, (err, data) => {
            if (err) {
                res.json({
                    error: "error_request",
                    error_description: err,
                });
                res.status(400);
                return;
            }
            if (data) {

                res.json({
                    error: "error_request",
                    error_description: 'Phone already exists.'
                })
                res.status(400);
                return;
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
                if (data) {

                    res.json({
                        error: "error_request",
                        error_description: 'Email already exists.'
                    })
                    res.status(400);
                    return;
                }

                next()
            })
        })
    }
}