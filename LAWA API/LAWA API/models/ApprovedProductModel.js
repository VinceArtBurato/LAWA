const mongoose = require('mongoose');

const approvedProductSchema = new mongoose.Schema({
  submissionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductSubmission',
    required: true,
    unique: true,
  },
  approvalDate: {
    type: Date,
    default: Date.now,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', 
    required: true,
  },
  approvedQuantity: {
    type: Number,
    required: true,
  },
  commissionPrice: {
    type: Number,
    required: true,
  },
  // Include all fields from ProductSubmission
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  validationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending', 
  },
});

const ApprovedProduct = mongoose.model('ApprovedProduct', approvedProductSchema);

module.exports = ApprovedProduct;
