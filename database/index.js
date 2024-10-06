const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  })


pool.connect((err) => {
    if (err) {
        console.error("Connection error", err.stack);
    } else {
        console.log("Connected successfully to PostgreSQL");
    }
});

module.exports = pool;