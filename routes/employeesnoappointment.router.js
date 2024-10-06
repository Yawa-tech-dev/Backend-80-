const express = require('express');
const router = express.Router();
const getEmployeesWithoutAppointmentsController = require('../controller/employeesnoappointment.controller'); // Import the controller

// Define the route for getting employees without appointments
router.get('/', getEmployeesWithoutAppointmentsController.getEmployeesWithoutAppointments); // GET /api/v1/employees/no-appointments

module.exports = router; // Export the router
