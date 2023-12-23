const PendingEmployeeApplication = require('../models/PendingUserModel');
const asyncHandler = require('express-async-handler');

// Get all pending employee applications
const getPendingEmployeeApplications = asyncHandler(async (req, res) => {
  try {
      const pendingApplications = await PendingEmployeeApplication.find({ applicationStatus: 'pending' })
          .populate('user', 'username firstName lastName email'); // Populate user details
      res.status(200).json(pendingApplications);
  } catch (error) {
      res.status(500);
      throw new Error(error.message);
  }
});

// Get a single pending employee application by ID
const getPendingEmployeeApplication = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const pendingApplication = await PendingEmployeeApplication.findById(id);
    if (!pendingApplication) {
      return res.status(404).json({ message: `Cannot find any pending application with ID ${id}` });
    }
    res.status(200).json(pendingApplication);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new pending employee application
const createPendingEmployeeApplication = asyncHandler(async (req, res) => {
  try {
    const pendingApplication = await PendingEmployeeApplication.create(req.body);
    res.status(201).json(pendingApplication);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a pending employee application by ID
const updatePendingEmployeeApplication = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPendingApplication = await PendingEmployeeApplication.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPendingApplication) {
      return res.status(404).json({ message: `Cannot find any pending application with ID ${id}` });
    }
    res.status(200).json(updatedPendingApplication);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a pending employee application by ID
const deletePendingEmployeeApplication = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPendingApplication = await PendingEmployeeApplication.findByIdAndDelete(id);
    if (!deletedPendingApplication) {
      return res.status(404).json({ message: `Cannot find any pending application with ID ${id}` });
    }
    res.status(200).json(deletedPendingApplication);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});


module.exports = {
  getPendingEmployeeApplications,
  getPendingEmployeeApplication,
  createPendingEmployeeApplication,
  updatePendingEmployeeApplication,
  deletePendingEmployeeApplication,
};
