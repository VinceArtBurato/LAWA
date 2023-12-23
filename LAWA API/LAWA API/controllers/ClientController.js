const Client = require('../models/ClientModel');
const asyncHandler = require('express-async-handler');

// Get all clients
const getClients = asyncHandler(async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Get a single client by ID
const getClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: `Cannot find any client with ID ${id}` });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new client
const createClient = asyncHandler(async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a client by ID
const updateClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClient) {
      return res.status(404).json({ message: `Cannot find any client with ID ${id}` });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a client by ID
const deleteClient = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: `Cannot find any client with ID ${id}` });
    }
    res.status(200).json(deletedClient);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const adminGetClient = asyncHandler(async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized. Insufficient role.' });
    }

    // Retrieve all clients
    const allClients = await Client.find();

    res.status(200).json({
      message: 'Successfully retrieved all clients',
      clients: allClients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
});


// Get client by ID (for admin)
const getClientByIdByAdmin = asyncHandler(async (req, res) => {
  try {
    // Check if the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status  (403).json({ message: 'Unauthorized. Insufficient role.' });
    }

    // Retrieve client by ID
    const clientId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found.' });
    }

    res.status(200).json({
      message: 'Successfully retrieved client by ID',
      client,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
});


module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  adminGetClient,
  getClientByIdByAdmin, 
};
