const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee.controller'); // Import the employee controller


router.get('/', employeeController.getAll); // GET /api/v1/employee

module.exports = router; // Export the router
