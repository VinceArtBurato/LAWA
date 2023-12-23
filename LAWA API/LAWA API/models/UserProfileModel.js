const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: String,
  dateOfBirth: Date,
  email: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
