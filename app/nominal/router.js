var express = require("express");
var router = express.Router();
let { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");
/* GET home page. */
router.use(isLoginAdmin);
/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get(`/edit/:id`, viewEdit);
router.put(`/edit/:id`, actionEdit);
router.delete(`/delete/:id`, actionDelete);

module.exports = router;
