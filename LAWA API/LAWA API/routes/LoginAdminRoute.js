const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const { signAdminToken } = require('../middleware/SignToken');

router.post('/', async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ Email });

    if (admin) {
      // Check if the provided password matches the stored hashed password
      const isPasswordMatch = await bcrypt.compare(Password, admin.Password);

      if (isPasswordMatch) {
        // Generate a JWT token using the signAdminToken function
        const token = signAdminToken(admin.adminId, process.env.ADMIN_JWT_SECRET, process.env.ADMIN_TOKEN_EXPIRATION);

        // Successful login response
        res.status(200).json({
          message: 'Login successful',
          token,
          admin: {
            id: admin.adminId,
            email: admin.Email,
            firstName: admin.FirstName,
            lastName: admin.LastName,
          },
        });
      } else {
        // Incorrect password
        res.status(401).json({ message: 'Password is incorrect' });
      }
    } else {
      // Admin not found
      res.status(401).json({ message: 'Email is incorrect' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
});

module.exports = router;
