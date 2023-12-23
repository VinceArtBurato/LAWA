const express = require('express');
const Employee = require('../models/EmployeeModel'); 

const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/EmployeeController');

// Define routes for managing employees
router.get('/', getEmployees); // Get all employees
router.get('/:id', getEmployee); // Get a single employee by ID
router.post('/', createEmployee); // Create a new employee
router.put('/:id', updateEmployee); // Update an employee by ID
router.delete('/:id', deleteEmployee); // Delete an employee by ID

module.exports = router;
