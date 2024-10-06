const express = require('express');
const router = express.Router();

const pendingController = require("../controller/pending.controller");

// GET pending appointments
router.get("/", pendingController.getPending);

module.exports = router;
