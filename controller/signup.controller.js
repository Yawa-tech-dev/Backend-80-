const pool = require('../database/index'); // Adjust the path based on your project structure
require('dotenv').config();
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const signupController = {
    signup: async (req, res) => {
        const { email, password, fname, lname, phone, street, city } = req.body;

        // Validate input data
        if (!email || !password || !fname || !lname || !phone || !street || !city) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        try {
            // Check if the user already exists
            const existingUserQuery = "SELECT * FROM customers WHERE email = $1";
            const existingUser = await pool.query(existingUserQuery, [email]);

            if (existingUser.rowCount > 0) {
                return res.status(400).json({ success: false, message: "Email already exists." });
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
            
            // Insert the new user into the database
            const sql = `
                INSERT INTO customers (email, password, fname, lname, phone, street, city) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING email, fname, lname`; // Optionally return some user details
            const values = [email, hashedPassword, fname, lname, phone, street, city];

            console.log('Executing SQL:', sql);
            console.log('With values:', values);
            
            // Execute the query to insert the new customer
            const result = await pool.query(sql, values);

            // Optionally return the newly created user data (except password)
            return res.status(201).json({ 
                success: true, 
                message: "Sign up successful", 
                user: { id: result.rows[0].id, email: result.rows[0].email, fname: result.rows[0].fname, lname: result.rows[0].lname } 
            });
        } catch (err) {
            console.error('Error during signup:', err); // Log any errors
            return res.status(500).json({ success: false, message: "An error occurred during signup." });
        }
    }
};

module.exports = signupController; // Export the signup controller
