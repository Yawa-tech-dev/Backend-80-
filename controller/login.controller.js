const db = require('../database/index'); 
const bcrypt = require('bcryptjs'); 

const loginController = {
    login: async (req, res) => {
        const { email, password } = req.body;
    
        console.log('Login attempt with Email:', email); // Log the email
    
        try {
            const userQuery = "SELECT * FROM customers WHERE email = $1";
            const userValues = [email];
            const userResult = await db.query(userQuery, userValues);
    
            console.log('User Query Result:', userResult.rows); // Log the result
    
            if (userResult.rows.length === 0) {
                return res.status(401).json({ success: false, message: "Invalid email or password." });
            }
    
            const user = userResult.rows[0];
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Invalid email or password." });
            }
    
            return res.json({ success: true, message: "Login successful", user });
        } catch (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ success: false, message: "An error occurred during login." });
        }
    }
};

module.exports = loginController; // Export the login controller
