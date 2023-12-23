const express = require('express');
const authenticateToken = require('../middleware/UserJwtMiddleware');
const {
  getPendingUsers,
  getPendingUser,
  signupAndCreatePendingUser,
  updatePendingUser,
  deletePendingUser,
} = require('../controllers/PendingUserController');

const router = express.Router();

// Define routes for managing pending users
router.get('/', getPendingUsers); // Get all pending users (authenticated)
router.get('/:id', getPendingUser); // Get a single pending user by ID (authenticated)
router.post('/', signupAndCreatePendingUser); // Create a new pending user
router.put('/:id', authenticateToken, updatePendingUser); // Update a pending user by ID (authenticated)
router.delete('/:id', authenticateToken, deletePendingUser); // Delete a pending user by ID (authenticated)

module.exports = router;
