// routes/service.router.js

const express = require('express');
const router = express.Router();

const serviceController = require('../controller/service.controller'); // Import the service controller

// Define the route for fetching all services
router.get('/', serviceController.getAll); // GET /api/v1/service

module.exports = router; // Export the router
