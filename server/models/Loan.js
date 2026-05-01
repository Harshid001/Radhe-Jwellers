const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  loanId: {
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
  idProof: {
    type: String,
    default: ''
  },
  ornamentType: {
    type: String,
    required: [true, 'Ornament type is required'],
    trim: true
  },
  metalType: {
    type: String,
    required: [true, 'Metal type is required'],
    enum: ['Gold', 'Silver']
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
  ornamentPhoto: {
    type: String,
    default: ''
  },
  estimatedValue: {
    type: Number,
    required: true,
    min: 0
  },
  loanPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  loanAmount: {
    type: Number,
    required: true,
    min: 0
  },
  monthlyInterestRate: {
    type: Number,
    required: true,
    min: 0
  },
  durationMonths: {
    type: Number,
    required: true,
    min: 1
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  penalty: {
    type: Number,
    default: 0,
    min: 0
  },
  interestAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  finalPayableAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paidAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  remainingAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Closed', 'Overdue', 'Defaulted'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Loan', loanSchema);
