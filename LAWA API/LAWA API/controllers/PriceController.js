const { json } = require('express');
const Price = require('../models/PriceModel'); // Import the Price model
const asyncHandler = require('express-async-handler');

// Get all prices
const getPrices = asyncHandler(async (req, res) => {
  try {
    const prices = await Price.find();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single price by ID
const getPrice = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const price = await Price.findById(id);
    if (!price) {
      return res.status(404).json({ message: `Cannot find any price with ID ${id}` });
    }
    res.status(200).json(price);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a price by ID
const updatePrice = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPrice = await Price.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPrice) {
      return res.status(404).json({ message: `Cannot find any price with ID ${id}` });
    }
    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a price
const createPrice = asyncHandler(async (req, res) => {
  try {
    const price = await Price.create(req.body);
    res.status(201).json(price);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a price by ID
const deletePrice = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPrice = await Price.findByIdAndDelete(id);
    if (!deletedPrice) {
      return res.status(404).json({ message: `Cannot find any price with ID ${id}` });
    }
    res.status(200).json(deletedPrice);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getPrices,
  getPrice,
  updatePrice,
  createPrice,
  deletePrice
};
