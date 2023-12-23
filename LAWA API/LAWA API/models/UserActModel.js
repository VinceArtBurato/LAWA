const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  activityID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activityDescription: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

module.exports = UserActivity;
