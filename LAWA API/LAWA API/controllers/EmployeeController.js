const Employee = require('../models/EmployeeModel'); // Import the Employee model
const asyncHandler = require('express-async-handler');

// Get all employees
const getEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single employee by ID
const getEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: `Cannot find any employee with ID ${id}` });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new employee
const createEmployee = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update an employee by ID
const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: `Cannot find any employee with ID ${id}` });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete an employee by ID
const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: `Cannot find any employee with ID ${id}` });
    }
    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
