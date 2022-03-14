var express = require("express");
var router = express.Router();
let { index, viewCreate, actionCreate } = require("./controller");
let multer = require("multer");
let os = require("os");

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", multer({ dest: os.tmpdir() }).single("image"), actionCreate);
// router.get(`/edit/:id`, viewEdit);
// router.put(`/edit/:id`, actionEdit);
// router.delete(`/delete/:id`, actionDelete);

module.exports = router;
