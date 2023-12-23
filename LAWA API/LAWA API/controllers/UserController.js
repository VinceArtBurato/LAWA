const PendingUser = require('../models/PendingUserModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  console.log('User in getUserProfile:', req.user);
  try {
    // Check if req.user is defined and has userId property
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized. User information not available.' });
    }

    const userId = req.user.userId;

    // Retrieve user details using the extracted ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: `Cannot find any user with ID ${userId}` });
    }

    // Send the user details in the response
    res.status(200).json({
      id: user._id,
      email: user.email || '', // Add default value or handle null case
      firstName: user.firstName || '', // Add default value or handle null case
      lastName: user.lastName || '', // Add default value or handle null case
      address: user.address || '', // Add default value or handle null case
      birthdate: user.dateOfBirth || '', // Add default value or handle null case
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching user data.', error: error.message });
  }
});




// Create a new user and generate a JWT token
const signupAndCreateEmployee = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, address, dateOfBirth, email, password } = req.body;

    // Check if required fields are present
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Create a new pending user
    const pendingUser = await PendingUser.create({
      username: email,
      password, // Don't forget to hash the password before saving it in production
      firstName,
      lastName,
      email,
      address,
      dateOfBirth,
      validationStatus: 'pending', // Set the initial validation status
    });

    // Generate JWT token (you may want to customize this based on your needs)
    const token = jwt.sign({ userId: pendingUser._id }, 'saadiucsdcbfvbfvbdsidbdiucb44353biuberbfuivb23398dscbadviusd', { expiresIn: '1h' });

    res.status(201).json({ pendingUser, token });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Duplicate email error
      return res.status(400).json({ message: 'Email address is already in use.' });
    }

    res.status(500).json({ message: error.message });
  }
});


// Update a user by ID
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: `Cannot find any user with ID ${id}` });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `Cannot find any user with ID ${id}` });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
// Get all users (for admin)
const getAllUsersByAdmin = asyncHandler(async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized. Insufficient role.' });
    }

    // Retrieve all users
    const allUsers = await User.find();

    res.status(200).json({
      message: 'Successfully retrieved all users',
      users: allUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
});

// Get user by ID (for admin)
const getUserByIdByAdmin = asyncHandler(async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized. Insufficient role.' });
    }

    // Retrieve user by ID
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
      message: 'Successfully retrieved user by ID',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
});


module.exports = {
  getUsers,
  getUserProfile,
  updateUser,
  deleteUser,
  signupAndCreateEmployee,
  getAllUsersByAdmin,
  getUserByIdByAdmin,
};