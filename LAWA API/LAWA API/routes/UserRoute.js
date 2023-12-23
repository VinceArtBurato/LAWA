const express = require('express');
const router = express.Router();
const { getUsers, getUserProfile, updateUser, deleteUser, signupAndCreateEmployee } = require('../controllers/UserController');
const authenticateToken = require('../middleware/UserJwtMiddleware');

// Define a route to get all users
router.get('/', getUsers);

// Define a route to get a single user profile by ID
router.get('/profile', authenticateToken, getUserProfile);

// Define a route to update a user by ID
router.put('/:id', updateUser);

// Define a route to delete a user by ID
router.delete('/:id', deleteUser);
  
// Define a route for user signup and create an associated employee
router.post('/signup', signupAndCreateEmployee);

// Example of a protected route
router.get('/protected-route', authenticateToken, (req, res) => {
  // Access user information using req.user
  res.json({ message: 'Protected route accessed successfully.', user: req.user });
});

module.exports = router;
