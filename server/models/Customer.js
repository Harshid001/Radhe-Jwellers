const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: ''
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  idProofType: {
    type: String,
    enum: ['Aadhar', 'PAN', 'Voter ID', 'Passport', 'Driving License', 'Other', ''],
    default: ''
  },
  idProofNumber: {
    type: String,
    trim: true,
    default: ''
  },
  idProofImage: {
    type: String,
    default: ''
  },
  verificationStatus: {
    type: String,
    enum: ['Pending', 'Verified', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

// Index for search
customerSchema.index({ name: 'text', mobile: 'text' });

module.exports = mongoose.model('Customer', customerSchema);
