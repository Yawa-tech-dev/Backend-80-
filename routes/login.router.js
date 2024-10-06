const express = require('express');
const router = express.Router();

const loginController = require('../controller/login.controller'); // Import the login controller

// Define the route for login
router.post('/', loginController.login); // POST /api/v1/login

module.exports = router; // Export the router
