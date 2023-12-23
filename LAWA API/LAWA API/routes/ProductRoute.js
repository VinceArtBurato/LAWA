const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel'); // Import the Product model
const {
  getProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct
} = require('../controllers/ProductController'); // Import the product controllers

// Define a route to get all products
router.get('/', getProducts);

// Define a route to get a single product by ID
router.get('/:id', getProduct);

// Define a route to update a product by ID
router.put('/:id', updateProduct);

// Define a route to create a product
router.post('/', createProduct);

// Define a route to delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
