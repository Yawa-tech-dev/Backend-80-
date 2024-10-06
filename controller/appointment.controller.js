const pool = require('../database/index'); // Adjusted for PostgreSQL
require('dotenv').config();

const appointment = {
    getAll: async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM appointment"); // Querying the PostgreSQL database
            res.json({
                data: result.rows // Access rows from the result
            });
        } catch (error) {
            console.error("Error fetching appointments:", error);
            res.status(500).json({
                status: "error",
                message: "Database query error"
            });
        }
    }
};

module.exports = appointment; // Eaxport the appointment object
