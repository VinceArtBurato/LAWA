const express = require('express');
const authenticateToken = require('../middleware/UserJwtMiddleware');
const adminauthenticateToken = require('../middleware/AdminJwtMiddleware');

const ProductSubmissionController = require('../controllers/ProductSubmissionController');

const {
  getProductSubmissions,
  getProductSubmission,
  createProductSubmission,
  updateProductSubmission,
  deleteProductSubmission,
} = ProductSubmissionController; // Import the ProductSubmission controllers

const router = express.Router();



// Define a route to get all product submissions
router.get('/', authenticateToken, getProductSubmissions);

// Define a route to get a single product submission by ID
router.get('/:id', authenticateToken, getProductSubmission);

// Define a route to create a product submission
router.post('/', authenticateToken, createProductSubmission);

// Define a route to update a product submission by ID
router.put('/:id', updateProductSubmission);

// Define a route to delete a product submission by ID
router.delete('/:id', deleteProductSubmission);


module.exports = router;
