var express = require("express");
var router = express.Router();
let { index, actionStatus } = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");
/* GET home page. */
router.use(isLoginAdmin);
/* GET home page. */
router.get("/", index);
router.put("/status/:id", actionStatus);

module.exports = router;
