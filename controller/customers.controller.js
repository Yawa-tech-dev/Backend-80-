const pool = require('../database/index'); // Assuming you are using PostgreSQL
require('dotenv').config();

const customers = {
    getAll: async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM customers"); // Querying the PostgreSQL database
            res.json({
                data: result.rows // Access rows from the result
            });
        } catch (error) {
            console.error("Error fetching customers:", error);
            res.status(500).json({
                status: "error",
                message: "Database query error"
            });
        }
    }
};

module.exports = customers;
