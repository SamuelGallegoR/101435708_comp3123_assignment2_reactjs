const express = require('express');
const connectDB = require('./config/db');

const userRoutes = require('./routes/UserRoute');
const employeeRoutes = require('./routes/EmployeeRoute');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware for json
app.use(express.json());

//def Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
