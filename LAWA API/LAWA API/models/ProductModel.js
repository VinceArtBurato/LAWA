const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true
    },
    productName: {
        type: String,
        required: [true, "Please enter the product's name"]
    },
    collectionPrice: {
        type: Number, 
        default: 0 
    }
});

// Define the 'Product' model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
