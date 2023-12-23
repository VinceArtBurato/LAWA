const express = require('express');
const adminauthenticateToken = require('../middleware/AdminJwtMiddleware');
const Client = require('../models/ClientModel'); // Add this line to import the Client model

// Import controllers
const { getAllProducts } = require('../controllers/ProductSubmissionController');
const { getAllUsersByAdmin } = require('../controllers/UserController');
const { getUserByIdByAdmin } = require('../controllers/UserController');
const { getAllProductNames, getProductByIdByAdmin } = require('../controllers/ProductController');
const { getClientByIdByAdmin, adminGetClient } = require('../controllers/ClientController');

const router = express.Router();

// Define routes for admin to retrieve data

// Retrieve all products submitted by users (for admin)
router.get('/RetProdSub', adminauthenticateToken, getAllProducts);

// Retrieve all clients (for admin)
router.get('/clients', adminauthenticateToken, adminGetClient);

// Retrieve a specific client by ID (for admin)
router.get('/clients/:id', adminauthenticateToken, getClientByIdByAdmin);

// Retrieve all users (for admin)
router.get('/retrieveUsers', adminauthenticateToken, getAllUsersByAdmin);

// Retrieve a specific user by ID (for admin)
router.get('/retrieveUsers/:id', adminauthenticateToken, getUserByIdByAdmin);

// Retrieve all products (for admin)
router.get('/products', adminauthenticateToken, getAllProductNames);

// Retrieve a specific product by ID (for admin)
router.get('/products/:id', adminauthenticateToken, getProductByIdByAdmin);

module.exports = router;
