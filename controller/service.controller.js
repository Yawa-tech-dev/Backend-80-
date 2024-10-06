const pool = require('../database/index'); // Adjust based on your database configuration
require('dotenv').config();

const serviceController = {
    getAll: async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM service'); // Querying the database
            res.json({
                data: result.rows // Access rows from the result
            });
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).json({
                status: 'error',
                message: 'Database query error'
            });
        }
    }
};

module.exports = serviceController; // Export the service controller
