const mongoose = require('mongoose');

const repairSchema = new mongoose.Schema({
  repairId: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer is required']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required']
  },
  ornamentType: {
    type: String,
    required: [true, 'Ornament type is required'],
    trim: true
  },
  metalType: {
    type: String,
    required: [true, 'Metal type is required'],
    enum: ['Gold', 'Silver', 'Other']
  },
  weight: {
    type: Number,
    default: 0,
    min: 0
  },
  problemDescription: {
    type: String,
    required: [true, 'Problem description is required'],
    trim: true
  },
  estimatedCharge: {
    type: Number,
    default: 0,
    min: 0
  },
  finalCharge: {
    type: Number,
    default: 0,
    min: 0
  },
  expectedDeliveryDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  ornamentPhoto: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Repair', repairSchema);
