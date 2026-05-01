const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  metalType: {
    type: String,
    required: [true, 'Metal type is required'],
    enum: ['Gold', 'Silver']
  },
  purity: {
    type: String,
    required: [true, 'Purity is required'],
    enum: ['24K', '22K', '18K', '14K', '999 Silver', '925 Silver', '900 Silver']
  },
  ratePerGram: {
    type: Number,
    required: [true, 'Rate per gram is required'],
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rate', rateSchema);
