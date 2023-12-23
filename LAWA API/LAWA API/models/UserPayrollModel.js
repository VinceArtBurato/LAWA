const mongoose = require('mongoose');

const userPayrollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activityNumber: {
    type: Number,
    required: true,
  },
  totalProducts: {
    type: Number,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  dateApproved: {
    type: Date,
    required: true,
  },
  totalShare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid'],
    required: true,
  },
  payrollDetails: {
    type: String, // You can change the data type to match your specific needs
  },
});

const UserPayroll = mongoose.model('UserPayroll', userPayrollSchema);

module.exports = UserPayroll;
