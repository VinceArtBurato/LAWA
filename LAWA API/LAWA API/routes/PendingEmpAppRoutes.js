const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/UserJwtMiddleware'); // Import your JWT middleware
const asyncHandler = require('express-async-handler'); // Import the asyncHandler middleware
const PendingEmployeeApplication = require('../models/PendingUserModel');
const {
  getPendingEmployeeApplications,
  getPendingEmployeeApplication,
  updatePendingEmployeeApplication,
  createPendingEmployeeApplication,
  deletePendingEmployeeApplication,
} = require('../controllers/PendingEmpAppController');

// Middleware for JWT authentication
router.use(jwtMiddleware);

// Define a route to get all pending employee applications
router.get('/', asyncHandler(getPendingEmployeeApplications));

// Define a route to get a single pending employee application by ID
router.get('/:id', asyncHandler(getPendingEmployeeApplication));

// Define a route to update a pending employee application by ID
router.put('/:id', asyncHandler(updatePendingEmployeeApplication));

// Define a route to create a new pending employee application
router.post('/', asyncHandler(createPendingEmployeeApplication));

// Define a route to delete a pending employee application by ID
router.delete('/:id', asyncHandler(deletePendingEmployeeApplication));

module.exports = router;
