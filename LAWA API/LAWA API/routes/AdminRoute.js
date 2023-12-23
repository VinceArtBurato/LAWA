const express = require('express');
const router = express.Router();
const { getAdmins, getAdminProfile, updateAdmin, deleteAdmin, signupAdmin } = require('../controllers/AdminController');
const authenticateToken = require('../middleware/UserJwtMiddleware');

// Define a route to get all admins
router.get('/', getAdmins);

// Define a route to get an admin profile by ID
router.get('/profile', authenticateToken, getAdminProfile);

// Define a route to update an admin by ID
router.put('/:id', updateAdmin);

// Define a route to delete an admin by ID
router.delete('/:id', deleteAdmin);

// Define a route for admin signup
router.post('/signup', signupAdmin);

// Example of a protected route
router.get('/protected-route', authenticateToken, (req, res) => {
  // Access admin information using req.user
  res.json({ message: 'Protected route accessed successfully.', admin: req.user });
});

module.exports = router;
