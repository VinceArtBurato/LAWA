const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), // Use a function to generate a new ObjectId
        unique: true
    },
    clientName: {
        type: String,
        required: [true, "Please enter the client's name"]
    },
});

// Define the 'Client' model
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
