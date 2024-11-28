// controllers/employeeController.js
const Employee = require('../models/EmployeeModel');


const getEmployees = async (req, res) => {
  try {
      const { q } = req.query;
      let query = {};

      // Build query based on 'q'
      if (q) {
          const isObjectId = /^[0-9a-fA-F]{24}$/.test(q); // Check if 'q' is a valid MongoDB ObjectId
          query = {
              $or: [
                  { first_name: { $regex: q, $options: 'i' } },
                  { last_name: { $regex: q, $options: 'i' } },
                  { department: { $regex: q, $options: 'i' } },
                  ...(isObjectId ? [{ _id: q }] : []) // Include '_id' only if 'q' is valid
              ]
          };
      }

      const employees = await Employee.find(query);
      res.status(200).json(employees);
  } catch (error) {
      console.error('Error fetching employees:', error.message);
      res.status(500).json({ message: 'Error fetching employees' });
  }
};







const createEmployee = async (req, res) => {
  const { first_name, last_name, email, position, salary, department } = req.body;

  if (!first_name || !last_name || !email || !position || !salary || !department) {
    return res.status(400).json({ message: 'All fields are required' });
  }

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
  const updates = req.body;

  // Validate that some updates are provided
  if (!Object.keys(updates).length) {
    return res.status(400).json({ message: 'No updates provided' });
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, updates, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
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

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};



module.exports = { getEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee };
