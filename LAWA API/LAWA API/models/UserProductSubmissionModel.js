const mongoose = require('mongoose');

const userProductSubmissionSchema = new mongoose.Schema({
  submissionID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  products: [
    {
      name: String,
      quantity: Number,
      details: String,
    },
  ],
});

const UserProductSubmission = mongoose.model('UserProductSubmission', userProductSubmissionSchema);

module.exports = UserProductSubmission;
