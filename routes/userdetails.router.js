
const express = require('express');
const router = express.Router();
const userDetailsController = require('../controller/userdetails.controller'); // Import the user details controller

// Define the route for fetching user details
router.post('/', userDetailsController.getUserDetails); 

module.exports = router; // Export the router
