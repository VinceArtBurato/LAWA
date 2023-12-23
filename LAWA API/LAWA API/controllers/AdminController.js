const Admin = require('../models/AdminModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all admins
const getAdmins = asyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get admin profile
const getAdminProfile = asyncHandler(async (req, res) => {
  try {
    if (!req.user || !req.user.adminId) {
      return res.status(401).json({ message: 'Unauthorized. Admin information not available.' });
    }

    const adminId = req.user.adminId;

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: `Cannot find any admin with ID ${adminId}` });
    }

    res.status(200).json({
      id: admin._id,
      email: admin.Email || '', // Add default value or handle null case
      firstName: admin.FirstName || '', // Add default value or handle null case
      lastName: admin.LastName || '', // Add default value or handle null case
      // Add other admin fields as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching admin data.', error: error.message });
  }
});

// Create a new admin and generate a JWT token
const signupAdmin = asyncHandler(async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password, Role } = req.body;

    // Check if required fields are present
    if (!FirstName || !LastName || !Email || !Password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Create a new admin
    const admin = await Admin.create({
      Username: Email,
      Password, // Don't forget to hash the password before saving it in production
      FirstName,
      LastName,
      Email,
    });

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, 'saadiucsdcbfvbfvbdsidbdiucb44353biuberbfuivb23398dscbadviusd', { expiresIn: '1h' });

    res.status(201).json({ admin, token });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.Email) {
      // Duplicate email error
      return res.status(400).json({ message: 'Email address is already in use.' });
    }

    res.status(500).json({ message: error.message });
  }
});

// Update an admin by ID
const updateAdmin = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: `Cannot find any admin with ID ${id}` });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an admin by ID
const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: `Cannot find any admin with ID ${id}` });
    }
    res.status(200).json(deletedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAdmins,
  getAdminProfile,
  signupAdmin,
  updateAdmin,
  deleteAdmin,
};
