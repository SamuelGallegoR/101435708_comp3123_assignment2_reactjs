// controllers/employeeController.js
const Employee = require('../models/EmployeeModel');

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

const createEmployee = async (req, res) => {
  const { first_name, last_name, email, position, salary, department } = req.body;

  try {
    const newEmployee = new Employee({ first_name, last_name, email, position, salary, department });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee_id: newEmployee._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.eid); 

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(204).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};


module.exports = { getEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee };
