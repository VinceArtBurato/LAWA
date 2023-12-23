const express = require('express');
const authenticateToken = require('../middleware/UserJwtMiddleware');
const ProductReportController = require('../controllers/productReportController');

const {
  getProductReports,
  getProductReport,
  updateProductReport,
  deleteProductReport,
} = ProductReportController; // Import the ProductReport controllers

const router = express.Router();

router.use(authenticateToken);

// Define a route to get all product reports
router.get('/', getProductReports);

// Define a route to get a single product report by ID
router.get('/:id', getProductReport);

// Define a route to update a product report by ID
router.put('/:id', updateProductReport);

// Define a route to delete a product report by ID
router.delete('/:id', deleteProductReport);

module.exports = router;
