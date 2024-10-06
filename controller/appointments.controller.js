const db = require('../database/index'); // Adjust the path based on your project structure
require('dotenv').config();

const appointmentsController = {
    getAppointments: (req, res) => {
        const sql = `
            SELECT
                a.appointmentID,
                a.date,
                a.time,
                s.serviceName,
                s.serviceID,
                s.Description,
                s.Price
            FROM
                appointment a
            JOIN
                service s
            ON
                a.serviceName = s.serviceName
        `;
        
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    }
};

module.exports = appointmentsController; // Export the appointments controller
