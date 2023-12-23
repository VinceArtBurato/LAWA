const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/UserJwtMiddleware');
const User = require('../models/UserModel');
const PendingUser = require('../models/PendingUserModel');
const sendConfirmationEmail = require('./sendConfirmationEmail'); // Import your email sending utility

// Endpoint to approve or reject a PendingUser
router.put('/validate/approve/:id', async (req, res) => {
  await validatePendingUser(req, res, 'approved');
});

router.put('/validate/reject/:id', async (req, res) => {
  await validatePendingUser(req, res, 'rejected');
});

async function validatePendingUser(req, res, validationStatus) {
  try {
    const { id } = req.params;

    // Find the PendingUser by ID
    const pendingUser = await PendingUser.findById(id);

    if (!pendingUser) {
      return res.status(404).json({ message: 'PendingUser not found.' });
    }

    // Update the validation status
    pendingUser.validationStatus = validationStatus;
    await pendingUser.save();

    // If approved, transfer data to User collection
    if (validationStatus === 'approved') {
      const { firstName, lastName, address, dateOfBirth, email, password } = pendingUser;

      const user = await User.create({
        username: email,
        password, 
        firstName,
        lastName,
        email,
        address,
        dateOfBirth,
        validated: true,
      });

      // Generate a JWT token for the newly created User
      const token = jwt.sign({ userId: user._id }, 'saadiucsdcbfvbfvbdsidbdiucb44353biuberbfuivb23398dscbadviusd', { expiresIn: '1h' });

      // Remove the pending user from the PendingUser collection
      await PendingUser.findByIdAndDelete(id);

      // Send confirmation email to the approved user
      await sendConfirmationEmail(email, firstName, 'approved');

      // Respond with the validated User and token
      res.status(200).json({ user, token });
    } else {
      // If rejected, remove the pending user from the PendingUser collection
      await PendingUser.findByIdAndDelete(id);

      // Send rejection email to the rejected user
      await sendConfirmationEmail(pendingUser.email, pendingUser.firstName, 'rejected');

      // Respond with the validation status
      res.status(200).json({ validationStatus });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.', error: error.message });
  }
}

module.exports = router;
