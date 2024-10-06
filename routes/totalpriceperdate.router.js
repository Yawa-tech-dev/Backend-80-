// routes/totalPrice.router.js

const express = require('express');
const router = express.Router();
const totalPricePerDateController = require('../controller/totalpriceperdate.controller'); // Import the total price controller

// Define the route for fetching total price per date
router.get('/', totalPricePerDateController.getTotalPricePerDate); 

module.exports = router; // Export the router
