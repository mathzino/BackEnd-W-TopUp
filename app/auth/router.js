var express = require("express");
var router = express.Router();
let multer = require("multer");
let os = require("os");

let { signup } = require("./controller");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signup);

module.exports = router;
