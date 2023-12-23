const express = require('express');
const UserActivity = require('../models/UserActModel'); // Import the UserActivity model
const {
  getUserActivities,
  getUserActivity,
  createUserActivity,
  updateUserActivity,
  deleteUserActivity,
} = require('../controllers/UserActController'); // Import the user activity controllers

const router = express.Router();

// Define a route to get all user activities
router.get('/', getUserActivities);

// Define a route to get a single user activity by ID
router.get('/:id', getUserActivity);

// Define a route to create a user activity
router.post('/', createUserActivity);

// Define a route to update a user activity by ID
router.put('/:id', updateUserActivity);

// Define a route to delete a user activity by ID
router.delete('/:id', deleteUserActivity);

module.exports = router;
