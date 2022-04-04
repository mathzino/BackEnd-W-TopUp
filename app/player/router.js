var express = require("express");
var router = express.Router();
let { landingPage, detailPage } = require("./controller");

router.get("/landingpage", landingPage);
router.get("/:id/detailpage", detailPage);

module.exports = router;
