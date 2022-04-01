var express = require("express");
var router = express.Router();
let { index } = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");
/* GET home page. */
router.use(isLoginAdmin);
router.get("/", index);

module.exports = router;
