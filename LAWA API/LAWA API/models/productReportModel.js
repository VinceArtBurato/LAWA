const mongoose = require('mongoose');

const productReportSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide the client"]
    },
    product: {
        type: String,
        required: [true, "Please enter the product name"]
    },
    quantity: {
        type: Number,
        required: [true, "Please enter the quantity"],
        min: [1, "Quantity must be at least 1"]
    },
});

// Define the 'ProductReport' model
const ProductReport = mongoose.model('ProductReport', productReportSchema);

module.exports = ProductReport;
