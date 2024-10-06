const pool = require('../database/index'); 
require('dotenv').config();

const pending = {
    getPending: async (req, res) => {
        const sql = `
            SELECT DISTINCT
                a.appointmentID,
                a.date,
                a.time,
                a.Status,
                a.EmpFName,
                b.TotalAmount,
                s.serviceName,
                s.serviceID,
                s.Description,
                s.Price,
                c.CustomerID, 
                c.FName,
                c.LName
            FROM
                appointment a
            JOIN
                service s ON a.serviceName = s.serviceName
            JOIN
                customers c ON a.CustomerID = c.CustomerID
            JOIN
                billing b ON c.CustomerID = b.CustomerID
            WHERE
                a.Status = 'Pending'
            ORDER BY 
                a.appointmentID;
        `;

        try {
            const result = await pool.query(sql);
            res.json({
                data: result.rows // Return the result rows
            });
        } catch (error) {
            console.error('Error fetching pending appointments:', error);
            res.status(500).json({
                status: 'error',
                message: 'Database query error'
            });
        }
    }
};

module.exports = pending;
