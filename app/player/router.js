var express = require("express");
var router = express.Router();
let multer = require("multer");
let os = require("os");
let { landingPage, detailPage, category, checkout, history, historyDetail, dashboard, profile, editProfile } = require("./controller");
const { isLoginPlayer } = require("../middleware/auth");
router.get("/landingpage", landingPage);
router.get("/category", category);
router.get("/:id/detailpage", detailPage);
router.post("/checkout", isLoginPlayer, checkout);
router.get("/history", isLoginPlayer, history);
router.get("/history/:id/detail", isLoginPlayer, historyDetail);
router.get("/dashboard", isLoginPlayer, dashboard);
router.get("/profile", isLoginPlayer, profile);
router.put("/profile", isLoginPlayer, multer({ dest: os.tmpdir() }).single("image"), editProfile);

module.exports = router;
