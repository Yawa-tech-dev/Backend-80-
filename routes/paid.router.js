const express = require('express');
const router = express.Router();

const paidController = require("../controller/paid.controller");

// GET paid appointments
router.get("/", paidController.getPaid);

module.exports = router;
