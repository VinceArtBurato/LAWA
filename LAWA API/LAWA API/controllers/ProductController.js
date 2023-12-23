const Product = require('../models/ProductModel');
const asyncHandler = require('express-async-handler');

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single product by ID
const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a product by ID
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a product by ID
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
const getAllProductNames = asyncHandler(async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized. Insufficient role.' });
    }

    // Retrieve all products
    const allProducts = await Product.find();

    res.status(200).json({
      message: 'Successfully retrieved all products',
      products: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
});
const getProductByIdByAdmin = asyncHandler(async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized. Insufficient role.' });
    }

    // Retrieve product by ID
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({
      message: 'Successfully retrieved product by ID',
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
});


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductNames,
  getProductByIdByAdmin, 
};