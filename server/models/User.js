const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['Admin', 'Billing Staff', 'Repair Manager', 'Loan Manager', 'Viewer'],
    default: 'Viewer'
  },
  permissions: {
    dashboard: { type: Boolean, default: true },
    customers: { type: Boolean, default: false },
    rates: { type: Boolean, default: false },
    billing: { type: Boolean, default: false },
    inventory: { type: Boolean, default: false },
    repairs: { type: Boolean, default: false },
    loans: { type: Boolean, default: false },
    reports: { type: Boolean, default: true },
    staff: { type: Boolean, default: false },
    settings: { type: Boolean, default: false }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Set permissions based on role
userSchema.pre('save', function(next) {
  if (this.isModified('role')) {
    switch (this.role) {
      case 'Admin':
        this.permissions = {
          dashboard: true, customers: true, rates: true, billing: true,
          inventory: true, repairs: true, loans: true, reports: true,
          staff: true, settings: true
        };
        break;
      case 'Billing Staff':
        this.permissions = {
          dashboard: true, customers: true, rates: true, billing: true,
          inventory: false, repairs: false, loans: false, reports: true,
          staff: false, settings: false
        };
        break;
      case 'Repair Manager':
        this.permissions = {
          dashboard: true, customers: true, rates: false, billing: false,
          inventory: false, repairs: true, loans: false, reports: true,
          staff: false, settings: false
        };
        break;
      case 'Loan Manager':
        this.permissions = {
          dashboard: true, customers: true, rates: false, billing: false,
          inventory: false, repairs: false, loans: true, reports: true,
          staff: false, settings: false
        };
        break;
      case 'Viewer':
        this.permissions = {
          dashboard: true, customers: false, rates: false, billing: false,
          inventory: false, repairs: false, loans: false, reports: true,
          staff: false, settings: false
        };
        break;
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
