const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const PendingUser = require('../models/PendingUserModel');
const bcrypt = require('bcrypt');
const { signUserToken } = require('../middleware/SignToken');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user is a PendingUser
    const pendingUser = await PendingUser.findOne({ email });

    if (pendingUser && pendingUser.validationStatus !== 'approved') {
      return res.status(401).json({ message: 'User is not yet validated by the admin. Please wait.' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // Check if the provided password matches the stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        // Generate a JWT token using the signUserToken function
        const token = signUserToken(user._id, process.env.USER_JWT_SECRET, process.env.USER_TOKEN_EXPIRATION);

        // Successful login response
        res.status(200).json({
          message: 'Login successful',
          token,
          user: {
            id: user._id,
            email: user.email,
          },
        });
      } else {
        // Incorrect password
        res.status(401).json({ message: 'Password is incorrect' });
      }
    } else {
      // User not found
      res.status(401).json({ message: 'Email is incorrect' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
});

module.exports = router;
