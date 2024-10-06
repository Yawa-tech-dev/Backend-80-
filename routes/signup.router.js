const express = require('express');
const router = express.Router();
const signupController = require('../controller/signup.controller'); // Import the signup controller

// Define the route for signing up
router.post('/', signupController.signup); // POST /api/v1/signup

module.exports = router; // Export the router
