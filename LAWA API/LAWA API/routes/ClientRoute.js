const express = require('express');
const router = express.Router();
const Client = require('../models/ClientModel'); // Import the Client model
const {
  getClients,
  getClient,
  updateClient,
  createClient,
  deleteClient
} = require('../controllers/ClientController'); // Import the client controllers

// Define a route to get all clients
router.get('/', getClients);

// Define a route to get a single client by ID
router.get('/:id', getClient);

// Define a route to update a client by ID
router.put('/:id', updateClient);

// Define a route to create a client
router.post('/', createClient);

// Define a route to delete a client by ID
router.delete('/:id', deleteClient);

module.exports = router;
