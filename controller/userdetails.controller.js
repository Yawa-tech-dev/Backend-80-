const pool = require('../database/index'); // Import the pool

const userDetailsController = {
    getUserDetails: async (req, res) => {
        const { email } = req.body; // or you can use CustomerID if you store it

        const sql = 'SELECT * FROM customers WHERE Email = $1'; // Use parameterized queries
        try {
            const result = await pool.query(sql, [email]); // Use the pool for the query
            if (result.rows.length > 0) {
                return res.json({ success: true, data: result.rows[0] });
            } else {
                return res.json({ success: false, message: 'No user found' });
            }
        } catch (err) {
            console.error('Database error:', err.message); // Log the error
            return res.status(500).json({ success: false, message: 'Database error' });
        }
    }
};

module.exports = userDetailsController; // Export the user details controller
