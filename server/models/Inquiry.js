const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Responded', 'Closed'],
    default: 'New'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
