const express = require('express');
const router = express.Router();
const SewerShare = require('../models/SewerShareModel'); // Import the SewerShare model
const {
  getSewerShares,
  getSewerShare,
  updateSewerShare,
  createSewerShare,
  deleteSewerShare
} = require('../controllers/SewerShareController'); // Import the sewer share controllers

// Define a route to get all sewer shares
router.get('/', getSewerShares);

// Define a route to get a single sewer share by ID
router.get('/:id', getSewerShare);

// Define a route to update a sewer share by ID
router.put('/:id', updateSewerShare);

// Define a route to create a sewer share
router.post('/', createSewerShare);

// Define a route to delete a sewer share by ID
router.delete('/:id', deleteSewerShare);

module.exports = router;
