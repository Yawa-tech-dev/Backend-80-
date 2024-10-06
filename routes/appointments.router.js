const express = require('express');
const router = express.Router();
const appointmentsController = require('../controller/appointments.controller'); // Import the appointments controller

// Define the route for fetching appointments
router.get('/', appointmentsController.getAppointments); 

module.exports = router; // Export the router
