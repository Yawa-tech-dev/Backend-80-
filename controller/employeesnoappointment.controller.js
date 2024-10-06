const db = require('../database/index'); // Adjust the path based on your project structure
require('dotenv').config();


const getEmployeesWithoutAppointmentsController = {
    getEmployeesWithoutAppointments: (req, res) => {
        const sql = `
            SELECT e.EmpFName, e.EmpLName, e.EmployeeID, e.Specialization, e.Phone
            FROM employee e
            LEFT JOIN appointment a ON e.EmployeeID = a.EmployeeID
            WHERE a.EmployeeID IS NULL;
        `;

        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching employees without appointments:', err);
                return res.status(500).json({ error: 'Database query error' });
            }
            res.json(results);
        });
    }
};

module.exports = getEmployeesWithoutAppointmentsController; // Export the controller
