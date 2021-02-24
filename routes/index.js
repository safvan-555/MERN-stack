var express = require("express");
var router = express.Router();
var auth = require("./api/auth/auth");
var contacts = require("./api/customers/customers");
// var shipp = require("./api/employes/employs");

router.use("/auth", auth);
router.use("/customers", contacts);
// router.use("/employs", shipp);
module.exports = router;
