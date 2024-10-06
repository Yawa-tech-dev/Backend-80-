const db = require('../database/index'); // Adjust the path based on your project structure
require('dotenv').config();

const userAppointmentsController = {
    getUserAppointments: (req, res) => {
        const { userEmail } = req.body; // Expecting userEmail

        if (!userEmail) {
            return res.status(400).json({ success: false, message: 'User email is required' });
        }

        const sql = `
            SELECT
                s.serviceName,
                s.Price,
                a.Status,
                COUNT(*) AS quantity
            FROM
                appointment a
            JOIN
                service s ON a.ServiceID = s.serviceID
            JOIN
                customers c ON a.CustomerID = c.CustomerID
            WHERE
                c.Email = $1 AND a.Status = 'Pending'
            GROUP BY
                s.serviceName, s.Price, a.Status
        `;

        db.query(sql, [userEmail], (err, results) => {
            if (err) {
                console.error('Error fetching user appointments:', err);
                return res.status(500).json({ success: false, message: 'Error fetching appointments' });
            }

            console.log('Query Results:', results); // Log the results

            // Check if results.rows exists and is an array
            const totalPrice = results.rows && Array.isArray(results.rows)
                ? results.rows.reduce((acc, curr) => acc + (curr.Price * curr.quantity), 0)
                : 0;

            res.json({
                success: true,
                data: results.rows || [], // Ensure that you're sending an array
                totalPrice,
            });
        });
    }
};

module.exports = userAppointmentsController; // Export the user appointments controller
