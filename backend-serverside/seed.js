const mongoose = require('mongoose');
const Employee = require('./models/EmployeeModel');

const MONGO_URI = 'mongodb://localhost:27017/employeeManagerDB';

const seedEmployees = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const dummyData = [
      { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', position: 'Software Engineer', salary: 75000, department: 'IT' },
      { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', position: 'Product Manager', salary: 95000, department: 'Product' },
      { first_name: 'Alice', last_name: 'Johnson', email: 'alice.johnson@example.com', position: 'Data Scientist', salary: 85000, department: 'Data' },
      { first_name: 'Bob', last_name: 'Brown', email: 'bob.brown@example.com', position: 'HR Specialist', salary: 60000, department: 'Human Resources' },
      { first_name: 'Charlie', last_name: 'Davis', email: 'charlie.davis@example.com', position: 'Marketing Executive', salary: 70000, department: 'Marketing' },
    ];

    await Employee.insertMany(dummyData);

    console.log('Dummy data inserted successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting dummy data:', err);
    mongoose.connection.close();
  }
};

seedEmployees();
