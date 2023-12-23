const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    default: function () {
      return new mongoose.Types.ObjectId();
    },
  },
  firstName: {
    type: String,
    required: [true, "Please enter the user's first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter the user's last name"],
  },
  address: String,
  dateOfBirth: Date,
  email: {
    type: String,
    required: [true, "Please enter the user's email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the user's password"],
  },
  validationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Add roles as needed
    default: 'user',
  },
});

// Define the 'PendingUser' model
const PendingUser = mongoose.model('PendingUser', pendingUserSchema);

module.exports = PendingUser;
