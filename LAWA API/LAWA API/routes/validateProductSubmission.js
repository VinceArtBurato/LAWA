const express = require('express');
const router = express.Router();
const ProductSubmission = require('../models/ProductSubmissionModel');
const ApprovedProductSubmission = require('../models/ApprovedProductModel');
const Payroll = require('../models/PayrollModel'); // Import the Payroll model
const asyncHandler = require('express-async-handler');
const adminauthenticateToken = require('../middleware/AdminJwtMiddleware');

// Endpoint to approve or reject a ProductSubmission
router.put('/validateProduct/approve/:submissionID', adminauthenticateToken, async (req, res) => {
  await validateProductSubmission(req, res, 'approved');
});

router.put('/validateProduct/reject/:submissionID', adminauthenticateToken, async (req, res) => {
  await validateProductSubmission(req, res, 'rejected');
});

async function validateProductSubmission(req, res, validationStatus) {
  try {
    const { submissionID } = req.params;

    // Find the ProductSubmission by submissionID and populate product details
    const productSubmission = await ProductSubmission.findOne({ submissionID })
      .populate('product')
      .populate('user')
      .populate('client');

    if (!productSubmission) {
      return res.status(404).json({ message: 'ProductSubmission not found.' });
    }

    // Update the validation status
    productSubmission.validationStatus = validationStatus;
    await productSubmission.save();

    // If approved, transfer data to ApprovedProductSubmission collection
    if (validationStatus === 'approved') {
      // Calculate salary based on the product details
      const salary = productSubmission.quantity * productSubmission.product.collectionPrice;

      const approvedProductSubmission = await ApprovedProductSubmission.create({
        submissionID: productSubmission.submissionID,
        approvedBy: req.user.userId,
        approvedQuantity: productSubmission.quantity,
        commissionPrice: productSubmission.product.collectionPrice, // Access commissionPrice from product
        // Include all fields from ProductSubmission
        user: productSubmission.user,
        client: productSubmission.client,
        dateSubmitted: productSubmission.dateSubmitted,
        product: productSubmission.product,
        quantity: productSubmission.quantity,
        validationStatus: productSubmission.validationStatus,
      });

      // Create a Payroll entry with status set to 'pending'
      const payroll = await Payroll.create({
        approvedProduct: approvedProductSubmission._id,
        product: productSubmission.product,
        client: productSubmission.client,
        quantity: productSubmission.quantity,
        totalShare: salary,
        dateApproved: approvedProductSubmission.approvalDate,
        user: productSubmission.user,
        status: 'pending', // Set the initial status to 'pending'
        // other payroll-related details...
      });

      // Remove the product submission from the ProductSubmission collection
      await ProductSubmission.deleteOne({ submissionID });

      res.status(200).json({ message: 'Product submission validated and approved successfully', approvedProductSubmission, payroll });
    } else {
      // If rejected, remove the product submission from the ProductSubmission collection
      await ProductSubmission.deleteOne({ submissionID });

      // Respond with the validation status
      res.status(200).json({ message: 'Product submission rejected', validationStatus });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
}

module.exports = router;
