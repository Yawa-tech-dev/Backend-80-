const pool = require('../database/index'); // Adjust based on your database configuration
require('dotenv').config();

const bookingController = {
    book: (req, res) => {
        const { date, time, serviceName, userEmail } = req.body;

        // Check for missing fields
        if (!date || !time || !serviceName || !userEmail) {
            return res.status(400).json({ success: false, message: 'Date, Time, Service Name, and User Email are required' });
        }

        console.log('Request Body:', req.body); // Log the request body for debugging

        // Fetch the serviceID and price from the service table based on serviceName
        const getServiceQuery = 'SELECT serviceid, Price FROM service WHERE serviceName = $1'; // Note the change here
        pool.query(getServiceQuery, [serviceName], (err, serviceResults) => {
            if (err) {
                console.error('Error fetching serviceID:', err);
                return res.status(500).json({ success: false, message: 'Error fetching serviceID' });
            }
        
            console.log('Service Results:', serviceResults.rows); // Log the service results
        
            if (serviceResults.rows.length === 0) {
                return res.status(404).json({ success: false, message: 'Service not found' });
            }
        
            // Store serviceID and Price into a variable
            const serviceData = {
                serviceID: serviceResults.rows[0].serviceid, // Updated property access
                price: serviceResults.rows[0].Price
            };
        
            // Fetch the customerID based on userEmail
            const getCustomerIdQuery = 'SELECT customerid FROM customers WHERE Email = $1'; // Note the change here
            pool.query(getCustomerIdQuery, [userEmail], (err, customerResults) => {
                if (err) {
                    console.error('Error fetching customerID:', err);
                    return res.status(500).json({ success: false, message: 'Error fetching customerID' });
                }

                console.log('Customer Results:', customerResults.rows); // Log the customer results

                if (customerResults.rows.length === 0) {
                    return res.status(404).json({ success: false, message: 'Customer not found' });
                }

                // Store the CustomerID
                const customerID = customerResults.rows[0].customerid; // Updated property access

                console.log('Stored Service Data:', serviceData.serviceID, 'Customer ID:', customerID); 

                // Insert the appointment with the serviceID, customerID, and status
                const insertAppointmentQuery = `
                    INSERT INTO "appointment" (Date, Time, ServiceName, ServiceID, CustomerID, Status) 
                    VALUES ($1, $2, $3, $4, $5, $6)`;

                const insertValues = [date, time, serviceName, serviceData.serviceID, customerID, 'Pending'];

                console.log('Inserting Appointment with values:', insertValues); // Log the values being inserted

                pool.query(insertAppointmentQuery, insertValues, (err, result) => {
                    if (err) {
                        console.error('Error inserting appointment:', err);
                        return res.status(500).json({ success: false, message: 'Booking failed' });
                    }

                    console.log('Appointment successfully inserted:', result); // Log successful insertion
                    // Success response for booking
                    return res.json({ success: true, message: 'Booking successful!' });
                });
            });
        });
    }
};

module.exports = bookingController;
