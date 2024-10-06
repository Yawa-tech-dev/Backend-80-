const pool = require('../database/index'); // Adjust based on your database configuration
require('dotenv').config();

const employeeController = {
    getAll: async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM employee'); // Querying the database
            res.json({
                data: result.rows // Access rows from the result
            });
        } catch (error) {
            console.error('Error fetching employees:', error);
            res.status(500).json({
                status: 'error',
                message: 'Database query error'
            });
        }
    }
};

module.exports = employeeController; // Export the employee controller
