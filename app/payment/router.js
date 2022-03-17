var express = require("express");
var router = express.Router();
let { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete, actionStatus } = require("./controller");

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get(`/edit/:id`, viewEdit);
router.put(`/edit/:id`, actionEdit);
router.delete(`/delete/:id`, actionDelete);
router.put(`/edit/status/:id`, actionStatus);

module.exports = router;
