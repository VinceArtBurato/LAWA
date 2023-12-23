const ProductSubmission = require('../models/ProductSubmissionModel');
const ProductReport = require('../models/productReportModel');

const asyncHandler = require('express-async-handler');

// Get all product submissions for the logged-in user
const getProductSubmissions = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.userId;
    const productSubmissions = await ProductSubmission.find({ user: userId });
    res.status(200).json(productSubmissions);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single product submission by ID
const getProductSubmission = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const productSubmission = await ProductSubmission.findById(id);
    if (!productSubmission) {
      return res.status(404).json({ message: `Cannot find any product submission with ID ${id}` });
    }
    res.status(200).json(productSubmission);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
// Create a new product submission
const createProductSubmission = async (req, res) => {
  try {
    const { client, product, quantity } = req.body;
    
    // Extract user ID from the token
    const userId = req.user.userId;  // Assuming your JWT payload includes userId

    const productSubmission = new ProductSubmission({
      user: userId,
      client,
      product,
      quantity,
    });

    const savedSubmission = await productSubmission.save();

    res.status(201).json({
      message: 'Product submission created successfully',
      productSubmission: savedSubmission,
    });
  } catch (error) {
    console.error('Error creating product submission:', error);
    res.status(500).json({ message: 'An error occurred while creating product submission.' });
  }
};


// Update a product submission by ID
const updateProductSubmission = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductSubmission = await ProductSubmission.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProductSubmission) {
      return res.status(404).json({ message: `Cannot find any product submission with ID ${id}` });
    }
    res.status(200).json(updatedProductSubmission);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a product submission by ID
const deleteProductSubmission = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProductSubmission = await ProductSubmission.findByIdAndDelete(id);
    if (!deletedProductSubmission) {
      return res.status(404).json({ message: `Cannot find any product submission with ID ${id}` });
    }
    res.status(200).json(deletedProductSubmission);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
const getAllProducts = async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized. Insufficient role.' });
    }

    // Retrieve all products submitted by users
    const allProducts = await ProductSubmission.find();

    res.status(200).json({
      message: 'Successfully retrieved all products',
      products: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
};


module.exports = {
  getProductSubmissions,
  getProductSubmission,
  createProductSubmission,
  updateProductSubmission,
  deleteProductSubmission,
  getAllProducts
};
