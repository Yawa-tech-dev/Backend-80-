const express = require('express');
const router = express.Router();

const paidByCustomerController = require("../controller/paidbycustomer.controller");

// GET paid appointments by customerID
router.get("/:customerID", paidByCustomerController.getPaidByCustomerID);

module.exports = router; // Export the router
