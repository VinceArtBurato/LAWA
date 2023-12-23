const mongoose = require('mongoose');

const sewerShareSchema = new mongoose.Schema({
    shareID: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        unique: true
    },
    amount: {
        type: Number,
        required: [true, "Please enter the amount for the sewer's share"]
    }
});

// Define the 'SewerShare' model
const SewerShare = mongoose.model('SewerShare', sewerShareSchema);

module.exports = SewerShare;
