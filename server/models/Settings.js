const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  shopName: {
    type: String,
    default: 'Radhe Jewellers'
  },
  tagline: {
    type: String,
    default: 'Trusted Gold & Silver Services'
  },
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  whatsapp: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  gstNumber: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  },
  invoicePrefix: {
    type: String,
    default: 'BILL'
  },
  invoiceTerms: {
    type: String,
    default: 'Thank you for your business!'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
