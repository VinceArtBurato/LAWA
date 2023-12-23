const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    priceID: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        unique: true
    },
    amount: {
        type: Number,
        required: [true, "Please enter the amount for the price"]
    }
});

// Define the 'Price' model
const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
