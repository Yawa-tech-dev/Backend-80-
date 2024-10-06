const express = require('express');
const router = express.Router();

const pendingByCustomerController = require("../controller/pendingbycustomer.controller");


router.get("/:customerID", pendingByCustomerController.getPendingByCustomerID);

module.exports = router;
