const express = require("express");
const router = express.Router();

const getEmployee = require("./get");
const createEmployee = require("./post");
const deleteEmployee = require("./delete");

router.use(getEmployee);
router.use(createEmployee);
router.use(deleteEmployee);

module.exports = router;