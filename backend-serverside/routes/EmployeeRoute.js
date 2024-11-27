const express = require('express');
const { getEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/EmployeeController');

const router = express.Router();

// Route to get all employees
router.get('/employees', getEmployees);

// Route to create a new employee
router.post('/employees', createEmployee);

// Route to get employee by ID
router.get('/employees/:eid', getEmployeeById);

// Route to update employee by ID
router.put('/employees/:eid', updateEmployee);

// Route to delete employee by ID
router.delete('/employees/:eid', deleteEmployee);

module.exports = router;
