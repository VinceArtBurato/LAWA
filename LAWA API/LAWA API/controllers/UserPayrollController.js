const UserPayroll = require('../models/UserPayrollModel');
const asyncHandler = require('express-async-handler');

// Get all user payrolls
const getUserPayrolls = asyncHandler(async (req, res) => {
  try {
    const userPayrolls = await UserPayroll.find();
    res.status(200).json(userPayrolls);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single user payroll by ID
const getUserPayroll = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userPayroll = await UserPayroll.findById(id);
    if (!userPayroll) {
      return res.status(404).json({ message: `Cannot find any user payroll with ID ${id}` });
    }
    res.status(200).json(userPayroll);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new user payroll
const createUserPayroll = asyncHandler(async (req, res) => {
  try {
    const userPayroll = await UserPayroll.create(req.body);
    res.status(201).json(userPayroll);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a user payroll by ID
const updateUserPayroll = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserPayroll = await UserPayroll.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUserPayroll) {
      return res.status(404).json({ message: `Cannot find any user payroll with ID ${id}` });
    }
    res.status(200).json(updatedUserPayroll);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a user payroll by ID
const deleteUserPayroll = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserPayroll = await UserPayroll.findByIdAndDelete(id);
    if (!deletedUserPayroll) {
      return res.status(404).json({ message: `Cannot find any user payroll with ID ${id}` });
    }
    res.status(200).json(deletedUserPayroll);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getUserPayrolls,
  getUserPayroll,
  createUserPayroll,
  updateUserPayroll,
  deleteUserPayroll,
};
