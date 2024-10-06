const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const axios = require('axios');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,POST', // Specify methods
    credentials: true, // Allow credentials (optional)
}));

const appointmentRouter = require("./routes/appointment.router"); 
const customerRouter = require("./routes/customers.router"); 
const pendingRouter = require("./routes/pending.router"); 
const paidRouter = require('./routes/paid.router');
const pendingByCustomerRouter = require('./routes/pendingbycustomer.router');
const paidByCustomerRouter = require('./routes/paidbycustomer.router');
const serviceRouter = require('./routes/service.router');
const employeeRouter = require('./routes/employee.router');
const totalPricePerDateRouter = require('./routes/totalpriceperdate.router');
const loginRouter = require('./routes/login.router');
const bookingRouter = require('./routes/booking.router');
const billingRouter = require('./routes/billing.router');
const userAppointmentsRouter = require('./routes/useappointments.router');
const appointmentsRouter = require('./routes/appointments.router');
const userDetailsRouter = require('./routes/userdetails.router');
const signUpRouter = require('./routes/signup.router');
const updateAppointmentRouter = require('./routes/updateappointment.router');
const employeesNoAppointmentRouter = require('./routes/employeesnoappointment.router');

app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/customers", customerRouter); 
app.use("/api/v1/pending", pendingRouter); 
app.use("/api/v1/paid", paidRouter);    
app.use("/api/v1/pendingbycustomer", pendingByCustomerRouter); 
app.use("/api/v1/paidbycustomer", paidByCustomerRouter); 
app.use("/api/v1/service", serviceRouter); 
app.use("/api/v1/employee", employeeRouter); 
app.use("/api/v1/totalpriceperdate", totalPricePerDateRouter); 
app.use("/api/v1/login", loginRouter); 
app.use("/api/v1/booking", bookingRouter); 
app.use("/api/v1/billing", billingRouter); 
app.use("/api/v1/userappointments", userAppointmentsRouter); 
app.use("/api/v1/appointments", appointmentsRouter); 
app.use("/api/v1/userdetails", userDetailsRouter); 
app.use("/api/v1/signup", signUpRouter); 
app.use("/api/v1/updateappointment", updateAppointmentRouter); 
app.use("/api/v1/emlpoyeenoappointment", employeesNoAppointmentRouter); 

const PORT = process.env.PORT || 21108; 

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT); 
});
