const pool = require('../database/index'); // Adjust based on your database configuration
require('dotenv').config();

const totalPricePerDateController = {
    getTotalPricePerDate: async (req, res) => {
        try {
            const query = `
                SELECT a.Date, SUM(s.Price) AS TotalIncome
                FROM appointment a
                JOIN service s ON a.ServiceName = s.ServiceName
                GROUP BY a.Date
                ORDER BY a.Date;
            `;
            const result = await pool.query(query); // Querying the database
            res.json(result.rows); // Send back the total price per date
        } catch (error) {
            console.error('Error fetching total price per date:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }
};

module.exports = totalPricePerDateController; // Export the total price controller
