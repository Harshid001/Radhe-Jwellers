const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  billNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer is required']
  },
  transactionType: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: ['Buy', 'Sell']
  },
  metalType: {
    type: String,
    required: [true, 'Metal type is required'],
    enum: ['Gold', 'Silver']
  },
  ornamentType: {
    type: String,
    required: [true, 'Ornament type is required'],
    trim: true
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: 0
  },
  purity: {
    type: String,
    required: [true, 'Purity is required']
  },
  rate: {
    type: Number,
    required: [true, 'Rate is required'],
    min: 0
  },
  makingCharges: {
    type: Number,
    default: 0,
    min: 0
  },
  wastageCharges: {
    type: Number,
    default: 0,
    min: 0
  },
  gstPercentage: {
    type: Number,
    default: 3,
    min: 0
  },
  gstAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  metalValue: {
    type: Number,
    default: 0,
    min: 0
  },
  finalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMode: {
    type: String,
    enum: ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque'],
    default: 'Cash'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Billing', billingSchema);
