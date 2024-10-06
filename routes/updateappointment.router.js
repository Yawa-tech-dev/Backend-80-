const express = require('express');
const router = express.Router();
const updateAppointmentController = require('../controller/updateappointment.controller'); // Import the total price controller

// Define the route for fetching total price per date
router.get('/', updateAppointmentController.updateAppointment); 

module.exports = router; // Export the router
