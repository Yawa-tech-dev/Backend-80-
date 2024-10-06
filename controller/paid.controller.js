const pool = require('../database/index'); 
require('dotenv').config();

const paid = {
    getPaid: async (req, res) => {
        const sql = `
            SELECT DISTINCT
                a.appointmentID,
                a.date,
                a.time,
                a.Status,
                a.EmpFName,
                e.EmpLName,
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
                employee e ON a.EmployeeID = e.EmployeeID  
            JOIN
                billing b ON c.CustomerID = b.CustomerID
            WHERE
                a.Status = 'Paid'
            ORDER BY 
                a.appointmentID;
        `;

        try {
            const result = await pool.query(sql);
            res.json({
                data: result.rows // Return the result rows
            });
        } catch (error) {
            console.error('Error fetching paid appointments:', error);
            res.status(500).json({
                status: 'error',
                message: 'Database query error'
            });
        }
    }
};

module.exports = paid;
