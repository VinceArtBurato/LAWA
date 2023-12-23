const mongoose = require('mongoose');

const userNotificationSchema = new mongoose.Schema({
  notificationID: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Please provide the user's ID"],
  },
  notificationType: {
    type: String,
    required: [true, 'Please specify the notification type'],
  },
  notificationContent: {
    type: String,
    required: [true, 'Please provide the notification content'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Define the 'UserNotification' model
const UserNotification = mongoose.model('UserNotification', userNotificationSchema);

module.exports = UserNotification;
