const { json } = require('express');
const SewerShare = require('../models/SewerShareModel'); // Import the SewerShare model
const asyncHandler = require('express-async-handler');

// Get all sewer shares
const getSewerShares = asyncHandler(async (req, res) => {
  try {
    const sewerShares = await SewerShare.find();
    res.status(200).json(sewerShares);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single sewer share by ID
const getSewerShare = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const sewerShare = await SewerShare.findById(id);
    if (!sewerShare) {
      return res.status(404).json({ message: `Cannot find any sewer share with ID ${id}` });
    }
    res.status(200).json(sewerShare);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a sewer share by ID
const updateSewerShare = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSewerShare = await SewerShare.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSewerShare) {
      return res.status(404).json({ message: `Cannot find any sewer share with ID ${id}` });
    }
    res.status(200).json(updatedSewerShare);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a sewer share
const createSewerShare = asyncHandler(async (req, res) => {
  try {
    const sewerShare = await SewerShare.create(req.body);
    res.status(201).json(sewerShare);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a sewer share by ID
const deleteSewerShare = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSewerShare = await SewerShare.findByIdAndDelete(id);
    if (!deletedSewerShare) {
      return res.status(404).json({ message: `Cannot find any sewer share with ID ${id}` });
    }
    res.status(200).json(deletedSewerShare);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getSewerShares,
  getSewerShare,
  updateSewerShare,
  createSewerShare,
  deleteSewerShare
};
