const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  loan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Payment amount is required'],
    min: 0
  },
  paymentMode: {
    type: String,
    enum: ['Cash', 'UPI', 'Card', 'Bank Transfer', 'Cheque'],
    default: 'Cash'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
