const UserActivity = require('../models/UserActModel');
const asyncHandler = require('express-async-handler');

// Get all user activities
const getUserActivities = asyncHandler(async (req, res) => {
  try {
    const userActivities = await UserActivity.find();
    res.status(200).json(userActivities);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single user activity by ID
const getUserActivity = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userActivity = await UserActivity.findById(id);
    if (!userActivity) {
      return res.status(404).json({ message: `Cannot find any user activity with ID ${id}` });
    }
    res.status(200).json(userActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new user activity
const createUserActivity = asyncHandler(async (req, res) => {
  try {
    const userActivity = await UserActivity.create(req.body);
    res.status(201).json(userActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a user activity by ID
const updateUserActivity = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserActivity = await UserActivity.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUserActivity) {
      return res.status(404).json({ message: `Cannot find any user activity with ID ${id}` });
    }
    res.status(200).json(updatedUserActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a user activity by ID
const deleteUserActivity = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserActivity = await UserActivity.findByIdAndDelete(id);
    if (!deletedUserActivity) {
      return res.status(404).json({ message: `Cannot find any user activity with ID ${id}` });
    }
    res.status(200).json(deletedUserActivity);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getUserActivities,
  getUserActivity,
  createUserActivity,
  updateUserActivity,
  deleteUserActivity
};
