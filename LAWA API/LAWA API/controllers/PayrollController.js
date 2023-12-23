const Payroll = require('../models/PayrollModel');
const asyncHandler = require('express-async-handler');

// Get all payrolls
const getPayrolls = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.userId;
    const payrolls = await Payroll.find({ user: userId });
    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getPayrollsByUserId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log("User ID:", id);

    // Use the user field directly (assuming it's an embedded document)
    const payrolls = await Payroll.find({ 'user': id })
      .populate('approvedProduct')
      .populate('product')
      .populate('client')
      .populate('user');

    console.log("Payrolls:", payrolls);

    if (!payrolls || payrolls.length === 0) {
      return res.status(404).json({ message: `No payrolls found for user with ID ${id}` });
    }

    res.status(200).json(payrolls);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500);
    throw new Error(error.message);
  }
});




// Get a single payroll by ID
const getPayroll = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res.status(404).json({ message: `Cannot find any payroll with ID ${id}` });
    }
    res.status(200).json(payroll);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Create a new payroll
const createPayroll = asyncHandler(async (req, res) => {
  try {
    const payroll = await Payroll.create(req.body);
    res.status(201).json(payroll);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Update a payroll by ID
const updatePayroll = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPayroll = await Payroll.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPayroll) {
      return res.status(404).json({ message: `Cannot find any payroll with ID ${id}` });
    }
    res.status(200).json(updatedPayroll);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// Delete a payroll by ID
const deletePayroll = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayroll = await Payroll.findByIdAndDelete(id);
    if (!deletedPayroll) {
      return res.status(404).json({ message: `Cannot find any payroll with ID ${id}` });
    }
    res.status(200).json(deletedPayroll);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getPayrolls,
  getPayroll,
  createPayroll,
  updatePayroll,
  deletePayroll,
  getPayrollsByUserId,
};
