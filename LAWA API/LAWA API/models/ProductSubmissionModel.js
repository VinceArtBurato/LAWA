const mongoose = require('mongoose');

const productSubmissionSchema = new mongoose.Schema({
  submissionID: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference the User model
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

// Define the 'ProductSubmission' model
const ProductSubmission = mongoose.model('ProductSubmission', productSubmissionSchema);

module.exports = ProductSubmission;
