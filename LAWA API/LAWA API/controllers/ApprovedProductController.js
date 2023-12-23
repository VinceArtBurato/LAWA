const ApprovedProduct = require('../models/ApprovedProductModel');
const ProductSubmission = require('../models/ProductSubmissionModel');
const asyncHandler = require('express-async-handler');

// Get all approved products
const getApprovedProducts = asyncHandler(async (req, res) => {
  try {
    const approvedProducts = await ApprovedProduct.find();
    res.status(200).json(approvedProducts);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get an approved product by submission ID
const getApprovedProductBySubmissionID = asyncHandler(async (req, res) => {
  try {
    const { submissionID } = req.params;
    const approvedProduct = await ApprovedProduct.findOne({ submissionID });
    if (!approvedProduct) {
      return res.status(404).json({ message: `Cannot find any approved product with submission ID ${submissionID}` });
    }
    res.status(200).json(approvedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new approved product
const createApprovedProduct = asyncHandler(async (req, res) => {
  try {
    const { submissionID } = req.body;
    
    // Check if the corresponding product submission exists
    const productSubmission = await ProductSubmission.findById(submissionID);
    if (!productSubmission) {
      return res.status(404).json({ message: `Cannot find any product submission with ID ${submissionID}` });
    }

    // Create the approved product
    const approvedProduct = await ApprovedProduct.create(req.body);

    res.status(201).json(approvedProduct);
  } catch (error) {
    console.error('Error creating approved product:', error);

    // Handle specific errors
    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., required fields missing)
      res.status(400).json({ message: 'Validation error', error: error.message });
    } else {
      // Handle other unexpected errors
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
});

// Update an approved product by submission ID
const updateApprovedProduct = asyncHandler(async (req, res) => {
  try {
    const { submissionID } = req.params;
    const updatedApprovedProduct = await ApprovedProduct.findOneAndUpdate({ submissionID }, req.body, { new: true });
    if (!updatedApprovedProduct) {
      return res.status(404).json({ message: `Cannot find any approved product with submission ID ${submissionID}` });
    }
    res.status(200).json(updatedApprovedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete an approved product by submission ID
const deleteApprovedProduct = asyncHandler(async (req, res) => {
  try {
    const { submissionID } = req.params;
    const deletedApprovedProduct = await ApprovedProduct.findOneAndDelete({ submissionID });
    if (!deletedApprovedProduct) {
      return res.status(404).json({ message: `Cannot find any approved product with submission ID ${submissionID}` });
    }
    res.status(200).json(deletedApprovedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getApprovedProducts,
  getApprovedProductBySubmissionID,
  createApprovedProduct,
  updateApprovedProduct,
  deleteApprovedProduct,
};
