
const express = require('express');
const router = express.Router();
const billingController = require('../controller/billing.controller'); // Import the billing controller

// Define the route for billing
router.post('/', billingController.processBilling); // POST /api/v1/billing

module.exports = router; // Export the router
