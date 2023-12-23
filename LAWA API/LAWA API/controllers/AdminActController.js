const AdminActivity = require('../models/AdminActModel');
const asyncHandler = require('express-async-handler');

// Get all admin activities
const getAdminActivities = asyncHandler(async (req, res) => {
  try {
    const adminActivities = await AdminActivity.find();
    res.status(200).json(adminActivities);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single admin activity by ID
const getAdminActivity = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const adminActivity = await AdminActivity.findById(id);
    if (!adminActivity) {
      return res.status(404).json({ message: `Cannot find any admin activity with ID ${id}` });
    }
    res.status(200).json(adminActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new admin activity
const createAdminActivity = asyncHandler(async (req, res) => {
  try {
    const adminActivity = await AdminActivity.create(req.body);
    res.status(201).json(adminActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update an admin activity by ID
const updateAdminActivity = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdminActivity = await AdminActivity.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAdminActivity) {
      return res.status(404).json({ message: `Cannot find any admin activity with ID ${id}` });
    }
    res.status(200).json(updatedAdminActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete an admin activity by ID
const deleteAdminActivity = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdminActivity = await AdminActivity.findByIdAndDelete(id);
    if (!deletedAdminActivity) {
      return res.status(404).json({ message: `Cannot find any admin activity with ID ${id}` });
    }
    res.status(200).json(deletedAdminActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getAdminActivities,
  getAdminActivity,
  createAdminActivity,
  updateAdminActivity,
  deleteAdminActivity
};
