// routes/appointment.router.js

const express = require('express');
const router = express.Router();

const customersController = require("../controller/customers.controller");

router.get("/", customersController.getAll)


module.exports = router; // Export the router
