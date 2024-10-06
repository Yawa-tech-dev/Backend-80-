
const db = require('../database/index'); // Adjust the path based on your project structure
require('dotenv').config();

const updateAppointmentController = {
    updateAppointment: (req, res) => {
        const { firstName, customerId } = req.body;

        if (!firstName || !customerId) {
            return res.status(400).json({ message: 'Missing data' });
        }

        // Fetch the EmployeeID based on EmpFName
        db.query(
            `SELECT EmployeeID FROM employee WHERE EmpFName = ?`,
            [firstName],
            (err, employeeResult) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                if (employeeResult.length === 0) {
                    return res.status(404).json({ message: 'Employee not found.' });
                }

                const employeeID = employeeResult[0].EmployeeID;

                // Update the appointment table with EmpFName and EmployeeID based on CustomerID
                db.query(
                    `UPDATE appointment SET EmpFName = ?, EmployeeID = ?, Status = 'Paid' WHERE CustomerID = ?`,
                    [firstName, employeeID, customerId],
                    (err, updateResult) => {
                        if (err) {
                            console.error('Database error:', err);
                            return res.status(500).json({ message: 'Internal server error' });
                        }

                        if (updateResult.affectedRows === 0) {
                            return res.status(404).json({ message: 'Appointment not found for the provided CustomerID.' });
                        }

                        res.json({ message: 'Appointment updated successfully' });
                    }
                );
            }
        );
    }
};

module.exports = updateAppointmentController; // Export the update appointment controller
