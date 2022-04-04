var express = require("express");
var router = express.Router();
let { landingPage, detailPage, category } = require("./controller");

router.get("/landingpage", landingPage);
router.get("/category", category);
router.get("/:id/detailpage", detailPage);

module.exports = router;
