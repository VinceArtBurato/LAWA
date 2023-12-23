const express = require('express');
const AdminActivity = require('../models/AdminActModel'); // Import the AdminActivity model
const {
  getAdminActivities,
  getAdminActivity,
  createAdminActivity,
  updateAdminActivity,
  deleteAdminActivity,
} = require('../controllers/AdminActController'); // Import the admin activity controllers


const router = express.Router();

// Define a route to get all admin activities
router.get('/', getAdminActivities);

// Define a route to get a single admin activity by ID
router.get('/:id', getAdminActivity);

// Define a route to create an admin activity
router.post('/', createAdminActivity);

// Define a route to update an admin activity by ID
router.put('/:id', updateAdminActivity);

// Define a route to delete an admin activity by ID
router.delete('/:id', deleteAdminActivity);

module.exports = router;
