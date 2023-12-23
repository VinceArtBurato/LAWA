const UserNotification = require('../models/UserNotificationModel');
const asyncHandler = require('express-async-handler');

// Get all user notifications
const getUserNotifications = asyncHandler(async (req, res) => {
  try {
    const userNotifications = await UserNotification.find();
    res.status(200).json(userNotifications);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single user notification by ID
const getUserNotification = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userNotification = await UserNotification.findById(id);
    if (!userNotification) {
      return res.status(404).json({ message: `Cannot find any user notification with ID ${id}` });
    }
    res.status(200).json(userNotification);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new user notification
const createUserNotification = asyncHandler(async (req, res) => {
  try {
    const userNotification = await UserNotification.create(req.body);
    res.status(201).json(userNotification);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a user notification by ID
const updateUserNotification = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserNotification = await UserNotification.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUserNotification) {
      return res.status(404).json({ message: `Cannot find any user notification with ID ${id}` });
    }
    res.status(200).json(updatedUserNotification);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a user notification by ID
const deleteUserNotification = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserNotification = await UserNotification.findByIdAndDelete(id);
    if (!deletedUserNotification) {
      return res.status(404).json({ message: `Cannot find any user notification with ID ${id}` });
    }
    res.status(200).json(deletedUserNotification);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getUserNotifications,
  getUserNotification,
  createUserNotification,
  updateUserNotification,
  deleteUserNotification
};
