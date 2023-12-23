const UserProfile = require('../models/UserProfileModel');
const asyncHandler = require('express-async-handler');

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.userId : null;

  console.log('User ID from token:', userId);

  try {
    if (!userId) {
      console.error('User ID not found in the token. Please log in.');
      return res.status(401).json({ message: 'User ID not found in the token. Please log in.' });
    }

    const userProfile = await UserProfile.findOne({ user: userId }).populate('user');

    console.log('User Profile:', userProfile);

    if (!userProfile) {
      console.error(`User profile not found for User ID ${userId}`);
      return res.status(404).json({ message: `User profile not found for User ID ${userId}` });
    }

    console.log('User profile successfully retrieved.');
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: error.message });
  }
});


// Create a new user profile
const createUserProfile = asyncHandler(async (req, res) => {
  try {
    const userProfile = await UserProfile.create(req.body);
    res.status(201).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user's profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    const updatedUserProfile = await UserProfile.findOneAndUpdate({ user: userId }, req.body, { new: true });
    
    if (!updatedUserProfile) {
      return res.status(404).json({ message: `User profile not found for User ID ${userId}` });
    }

    res.status(200).json(updatedUserProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user's profile
const deleteUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUserProfile = await UserProfile.findOneAndRemove({ user: userId });

    if (!deletedUserProfile) {
      return res.status(404).json({ message: `User profile not found for User ID ${userId}` });
    }

    res.status(200).json(deletedUserProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
