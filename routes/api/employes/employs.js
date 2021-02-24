var express = require('express')
var router = express.Router()
const { validateToken, } = require('../../libs/authentication')
const {
    newEmploy,
} = require("./employe_model");

router.post('/create', validateToken(), (req, res) => {

    if (!req.body.name) {
        res.json({ error: 'invalid_details', error_description: "Name is required." })
        res.status(400);
        return
    }
    if (!req.body.address) {
        res.json({ error: 'invalid_details', error_description: "Address is required." })
        res.status(400);
        return
    }
    let datas = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        email: req.body.email,
        phone: req.body.phone,
    }
    newEmploy(datas, (err, batchdata) => {
        if (err) {
            res.json({
                error: 'error_request',
                error_description: err.message
            })
            res.status(400);
            return
        }
        res.json({ message: 'Created successfully.' })
    })
})


module.exports = router