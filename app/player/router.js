var express = require("express");
var router = express.Router();
let { landingPage, detailPage, category, checkout } = require("./controller");
const { isLoginPlayer } = require("../middleware/auth");
router.get("/landingpage", landingPage);
router.get("/category", category);
router.get("/:id/detailpage", detailPage);
router.post("/checkout", isLoginPlayer, checkout);

module.exports = router;
