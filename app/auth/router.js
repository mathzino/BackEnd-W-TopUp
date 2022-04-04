var express = require("express");
var router = express.Router();
let multer = require("multer");
let os = require("os");

let { signup, signin } = require("./controller");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signup);
router.post("/signin", signin);

module.exports = router;
