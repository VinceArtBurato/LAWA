const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  payrollID: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  approvedProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ApprovedProduct',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalShare: {
    type: Number,
    required: true,
  },
  dateApproved: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
});

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;
