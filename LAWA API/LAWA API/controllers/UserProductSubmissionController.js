const UserProductSubmission = require('../models/UserProductSubmissionModel');
const asyncHandler = require('express-async-handler');

// Get all user product submissions
const getUserProductSubmissions = asyncHandler(async (req, res) => {
  try {
    const userProductSubmissions = await UserProductSubmission.find();
    res.status(200).json(userProductSubmissions);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single user product submission by ID
const getUserProductSubmission = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userProductSubmission = await UserProductSubmission.findById(id);
    if (!userProductSubmission) {
      return res.status(404).json({ message: `Cannot find any user product submission with ID ${id}` });
    }
    res.status(200).json(userProductSubmission);
  } catch (error) {
    res.status(500);
    throw Error(error.message);
  }
});

// Create a new user product submission
const createUserProductSubmission = asyncHandler(async (req, res) => {
  try {
    const userProductSubmission = await UserProductSubmission.create(req.body);
    res.status(201).json(userProductSubmission);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a user product submission by ID
const updateUserProductSubmission = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserProductSubmission = await UserProductSubmission.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUserProductSubmission) {
      return res.status(404).json({ message: `Cannot find any user product submission with ID ${id}` });
    }
    res.status(200).json(updatedUserProductSubmission);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a user product submission by ID
const deleteUserProductSubmission = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserProductSubmission = await UserProductSubmission.findByIdAndDelete(id);
    if (!deletedUserProductSubmission) {
      return res.status(404).json({ message: `Cannot find any user product submission with ID ${id}` });
    }
    res.status(200).json(deletedUserProductSubmission);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getUserProductSubmissions,
  getUserProductSubmission,
  createUserProductSubmission,
  updateUserProductSubmission,
  deleteUserProductSubmission,
};
