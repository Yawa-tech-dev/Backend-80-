// routes/userAppointments.router.js
const express = require('express');
const router = express.Router();
const userAppointmentsController = require('../controller/userappointments.controller'); // Import the user appointments controller

// Define the route for fetching user appointments
router.post('/', userAppointmentsController.getUserAppointments); // POST /api/v1/userAppointments

module.exports = router; // Export the router
