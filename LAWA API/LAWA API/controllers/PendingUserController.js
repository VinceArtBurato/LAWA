const PendingUser = require('../models/PendingUserModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all pending users
const getPendingUsers = asyncHandler(async (req, res) => {
  try {
    const pendingUsers = await PendingUser.find();
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single pending user by ID
const getPendingUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const pendingUser = await PendingUser.findById(id);
    if (!pendingUser) {
      return res.status(404).json({ message: `Cannot find any pending user with ID ${id}` });
    }
    res.status(200).json(pendingUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new pending user and generate a JWT token
const signupAndCreatePendingUser = asyncHandler(async (req, res) => {
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

// Update a pending user by ID
const updatePendingUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPendingUser = await PendingUser.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPendingUser) {
      return res.status(404).json({ message: `Cannot find any pending user with ID ${id}` });
    }
    res.status(200).json(updatedPendingUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a pending user by ID
const deletePendingUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPendingUser = await PendingUser.findByIdAndDelete(id);
    if (!deletedPendingUser) {
      return res.status(404).json({ message: `Cannot find any pending user with ID ${id}` });
    }
    res.status(200).json(deletedPendingUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getPendingUsers,
  getPendingUser,
  signupAndCreatePendingUser,
  updatePendingUser,
  deletePendingUser,
};
