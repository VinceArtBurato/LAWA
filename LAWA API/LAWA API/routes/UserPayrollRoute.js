const express = require('express');
const UserPayroll = require('../models/UserPayrollModel'); // Import the UserPayroll model
const {
  getUserPayrolls,
  getUserPayroll,
  createUserPayroll,
  updateUserPayroll,
  deleteUserPayroll,
} = require('../controllers/UserPayrollController'); // Import the user payroll controllers

const router = express.Router();

// Define a route to get all user payrolls
router.get('/', getUserPayrolls);

// Define a route to get a single user payroll by ID
router.get('/:id', getUserPayroll);

// Define a route to create a user payroll
router.post('/', createUserPayroll);

// Define a route to update a user payroll by ID
router.put('/:id', updateUserPayroll);

// Define a route to delete a user payroll by ID
router.delete('/:id', deleteUserPayroll);

module.exports = router;
