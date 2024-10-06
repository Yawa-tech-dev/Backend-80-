const pool = require('../database/index'); // Adjust based on your database configuration
require('dotenv').config();

const billingController = {
    processBilling: (req, res) => {
        const { totalAmount, billingDate, userEmail } = req.body;

        console.log('Request body:', req.body);

        // Check for missing fields
        if (!totalAmount || !billingDate || !userEmail) {
            return res.status(400).json({ success: false, message: 'Total Amount, Billing Date, and User Email are required' });
        }

        // Fetch the customerID based on userEmail
        const getCustomerIdQuery = 'SELECT customerid FROM customers WHERE Email = $1';
        pool.query(getCustomerIdQuery, [userEmail], (err, customerResults) => {
            if (err) {
                console.error('Error fetching customerID:', err);
                return res.status(500).json({ success: false, message: 'Error fetching customerID' });
            }

            // Check if customer was found
            if (customerResults.rows.length === 0) {
                return res.status(404).json({ success: false, message: 'Customer not found' });
            }

            const customerID = customerResults.rows[0].customerid; // Ensure the correct property name (case-sensitive)

            console.log('Customer ID:', customerID);

            // Check if a billing record exists for this customer
            const getBillingQuery = 'SELECT billingid, totalamount, billingdate FROM billing WHERE customerid = $1';
            pool.query(getBillingQuery, [customerID], (err, billingResults) => {
                if (err) {
                    console.error('Error fetching billing data:', err);
                    return res.status(500).json({ success: false, message: 'Error fetching billing data' });
                }

                const existingBilling = billingResults.rows.length > 0 ? billingResults.rows[0] : null;

                if (!existingBilling) {
                    // No existing billing record, insert a new one
                    const insertBillingQuery = 'INSERT INTO billing (totalamount, billingdate, customerid) VALUES ($1, $2, $3) RETURNING billingid';
                    pool.query(insertBillingQuery, [totalAmount, billingDate, customerID], (err, billingResult) => {
                        if (err) {
                            console.error('Error inserting billing:', err);
                            return res.status(500).json({ success: false, message: 'Error generating invoice' });
                        }

                        const billingID = billingResult.rows[0].billingid; // Access the newly created BillingID

                        // Insert into payment table
                        const insertPaymentQuery = 'INSERT INTO payment (appointmentid, customerid, billingid, totalamount) VALUES ($1, $2, $3, $4)';

                        // Fetch appointmentID for the customer
                        const getAppointmentQuery = 'SELECT appointmentid FROM appointment WHERE customerid = $1';
                        pool.query(getAppointmentQuery, [customerID], (err, appointmentResults) => {
                            if (err) {
                                console.error('Error fetching appointmentID:', err);
                                return res.status(500).json({ success: false, message: 'Error fetching appointmentID' });
                            }

                            if (appointmentResults.rows.length === 0) {
                                return res.status(404).json({ success: false, message: 'No appointments found for this customer' });
                            }

                            const appointmentID = appointmentResults.rows[0].appointmentid; // Ensure the correct property name (case-sensitive)

                            pool.query(insertPaymentQuery, [appointmentID, customerID, billingID, totalAmount], (err) => {
                                if (err) {
                                    console.error('Error inserting payment:', err);
                                    return res.status(500).json({ success: false, message: 'Error recording payment' });
                                }

                                // Success response for new billing and payment record
                                return res.json({ success: true, message: 'Billing and payment record created successfully!' });
                            });
                        });
                    });
                } else {
                    // Billing record exists, check if any service quantity has changed or new services have been added
                    const { billingid: existingBillingID, totalamount: currentTotal } = existingBilling; // Ensure the correct property names (case-sensitive)

                    // Recalculate the total amount for the user
                    const getUpdatedTotalQuery = `
                        SELECT
                            s.price,
                            COUNT(*) as quantity
                        FROM
                            appointment a
                        JOIN
                            service s ON a.serviceid = s.serviceid
                        WHERE
                            a.customerid = $1
                        GROUP BY
                            s.price
                    `;
                    pool.query(getUpdatedTotalQuery, [customerID], (err, results) => {
                        if (err) {
                            console.error('Error recalculating total amount:', err);
                            return res.status(500).json({ success: false, message: 'Error recalculating total amount' });
                        }

                        const newTotal = results.rows.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

                        if (newTotal === currentTotal) {
                            // If no change in total, do not update
                            return res.json({ success: true, message: 'No changes in service quantities, billing not updated' });
                        }

                        // Update the billing record
                        const updateBillingQuery = 'UPDATE billing SET totalamount = $1, billingdate = $2 WHERE billingid = $3';
                        pool.query(updateBillingQuery, [newTotal, billingDate, existingBillingID], (err) => {
                            if (err) {
                                console.error('Error updating billing:', err);
                                return res.status(500).json({ success: false, message: 'Error updating billing record' });
                            }

                            // Update the payment record
                            const updatePaymentQuery = 'UPDATE payment SET totalamount = $1 WHERE billingid = $2 AND customerid = $3';
                            pool.query(updatePaymentQuery, [newTotal, existingBillingID, customerID], (err) => {
                                if (err) {
                                    console.error('Error updating payment:', err);
                                    return res.status(500).json({ success: false, message: 'Error updating payment record' });
                                }

                                // Success response for updated billing and payment record
                                return res.json({ success: true, message: 'Billing and payment record updated successfully!' });
                            });
                        });
                    });
                }
            });
        });
    }
};

module.exports = billingController; // Export the billing controller
