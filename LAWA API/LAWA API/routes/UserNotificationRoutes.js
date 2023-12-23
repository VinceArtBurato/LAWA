const express = require('express');
const UserNotification = require('../models/UserNotificationModel'); // Import the UserNotification model
const {
  getUserNotifications,
  getUserNotification,
  createUserNotification,
  updateUserNotification,
  deleteUserNotification,
} = require('../controllers/UserNotificationController'); // Import the user notification controllers

const router = express.Router();

// Define a route to get all user notifications
router.get('/', getUserNotifications);

// Define a route to get a single user notification by ID
router.get('/:id', getUserNotification);

// Define a route to create a user notification
router.post('/', createUserNotification);

// Define a route to update a user notification by ID
router.put('/:id', updateUserNotification);

// Define a route to delete a user notification by ID
router.delete('/:id', deleteUserNotification);

module.exports = router;
