const express = require('express');
const UserProfile = require('../models/UserProfileModel');
const authenticateToken = require('../middleware/UserJwtMiddleware');
const {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/UserProfileController');
const router = express.Router();

// Get a user's profile by User ID
router.get('/:userId', authenticateToken, getUserProfile);


// Create a new user profile
router.post('/', createUserProfile);

// Update a user's profile
router.put('/:userId', updateUserProfile);

// Delete a user's profile
router.delete('/:userId', deleteUserProfile);

module.exports = router;
