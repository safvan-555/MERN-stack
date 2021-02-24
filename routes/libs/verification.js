

var vefifyModel = require('../api/customers/customer_model')
var nodemailer = require("nodemailer");
var rn = require('random-number');
var gen = rn.generator({
    min: 100000
    , max: 999999
    , integer: true
})

exports.new_code = (email, callback) => {
    let code = gen()
    let expiry = new Date()
    expiry.setMinutes(expiry.getMinutes() + 10)
    vefifyModel.new({
        email: email,
        code: code,
        expiry: expiry.toISOString(),
    }, (err, code) => callback(err, code))
}


exports.verify_code = () => {
    return (req, res, next) => {
        if (!req.body.verify_code) {
            res.json({ error: "invalid_details", error_description: "Verification code is required" })
            res.status(400);
            return
        }
        vefifyModel.getByCode(req.body.verify_code).then(code => {
            if (!code) {
                res.json({ error: "invalid_code", error_description: "Code provided is not valid." })
                res.status(400);
                return
            }
            let expiry = new Date(code.expiry)
            let now = new Date()
            if (expiry < now) {
                res.json({ error: "invalid_code", error_description: "Code already used or expired." })
                res.status(400);
                return
            }
            res.locals.code = code
            next()
        })
    }
}






exports.send_mail = (to, subject, message, callback) => {
    return new Promise(async (resolve, reject) => {
        var smtpTransport = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'juelet', // generated ethereal user
                pass: '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'  // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }

        });

        var mailOptions = {
            from: 'no_replay@gmail.com',
            to: to,
            subject: subject,
            html: message,
        }
        let resp = false;

        smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error is " + error);
                resolve(false);
            }
            else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });

    })
}
