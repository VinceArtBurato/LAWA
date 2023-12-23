const express = require('express');
const adminauthenticateToken = require('../middleware/AdminJwtMiddleware');
const ApprovedProductController = require('../controllers/ApprovedProductController');

const {
  getApprovedProducts,
  getApprovedProductBySubmissionID,
  createApprovedProduct,
  updateApprovedProduct,
  deleteApprovedProduct,
} = ApprovedProductController; // Import the ApprovedProduct controllers

const router = express.Router();

// Define a route to get all approved products
router.get('/', adminauthenticateToken, getApprovedProducts);

// Define a route to get an approved product by submission ID
router.get('/:submissionID',adminauthenticateToken, getApprovedProductBySubmissionID);

// Define a route to create an approved product
router.post('/',adminauthenticateToken, createApprovedProduct);

// Define a route to update an approved product by submission ID
router.put('/:submissionID',adminauthenticateToken, updateApprovedProduct);

// Define a route to delete an approved product by submission ID
router.delete('/:submissionID',adminauthenticateToken, deleteApprovedProduct);

module.exports = router;
