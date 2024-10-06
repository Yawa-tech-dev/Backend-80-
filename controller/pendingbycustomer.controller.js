const pool = require('../database/index'); // Assuming PostgreSQL
require('dotenv').config();

const pendingByCustomer = {
    getPendingByCustomerID: async (req, res) => {
        const { customerID } = req.params; // Extracting customerID from route parameters
        const sql = `
            SELECT 
                s.serviceName,
                s.Description,
                s.Price,
                a.Status,
                a.Time,
                a.Date
            FROM 
                appointment a
            JOIN 
                service s ON a.serviceName = s.serviceName
            WHERE 
                a.CustomerID = $1 AND a.Status = 'Pending'
        `;

        try {
            const result = await pool.query(sql, [customerID]); // Using parameterized query for safety
            res.json({
                data: result.rows // Return result rows in JSON format
            });
        } catch (error) {
            console.error('Error fetching pending services for customer:', error);
            res.status(500).json({
                status: 'error',
                message: 'Database query error'
            });
        }
    }
};

module.exports = pendingByCustomer;
