const mongoose = require('mongoose');

const adminActivitySchema = new mongoose.Schema({
    activityID: {
        type: mongoose.Schema.Types.ObjectId,
        default: function() {
            return new mongoose.Types.ObjectId();
        },
        required: true,
        unique: true,
    },
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    activityDescription: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Define the 'AdminActivity' model
const AdminActivity = mongoose.model('AdminActivity', adminActivitySchema);

module.exports = AdminActivity;
