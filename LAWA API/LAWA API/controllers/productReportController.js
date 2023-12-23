const ProductReport = require('../models/productReportModel');
const asyncHandler = require('express-async-handler');
const authenticateToken = require('../middleware/UserJwtMiddleware');


// Get all product reports
const getProductReports = asyncHandler(async (req, res) => {
    try {
      const productReports = await ProductReport.find();
      res.status(200).json(productReports);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  // Get a single product report by ID
  const getProductReport = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const productReport = await ProductReport.findById(id);
      if (!productReport) {
        return res.status(404).json({ message: `Cannot find any product report with ID ${id}` });
      }
      res.status(200).json(productReport);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  // Update a product report by ID
  const updateProductReport = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProductReport = await ProductReport.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProductReport) {
        return res.status(404).json({ message: `Cannot find any product report with ID ${id}` });
      }
      res.status(200).json(updatedProductReport);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  // Delete a product report by ID
  const deleteProductReport = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProductReport = await ProductReport.findByIdAndDelete(id);
      if (!deletedProductReport) {
        return res.status(404).json({ message: `Cannot find any product report with ID ${id}` });
      }
      res.status(200).json(deletedProductReport);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  module.exports = {
    getProductReports: [authenticateToken, getProductReports],
    getProductReport: [authenticateToken, getProductReport],
    updateProductReport: [authenticateToken, updateProductReport],
    deleteProductReport: [authenticateToken, deleteProductReport],
  };