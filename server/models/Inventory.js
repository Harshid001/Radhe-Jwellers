const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  metalType: {
    type: String,
    required: [true, 'Metal type is required'],
    enum: ['Gold', 'Silver']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Ring', 'Chain', 'Necklace', 'Bracelet', 'Earrings', 'Anklet', 'Coin', 'Bar', 'Pendant', 'Bangle', 'Other']
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
  purchasePrice: {
    type: Number,
    required: [true, 'Purchase price is required'],
    min: 0
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: 0
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Repair', 'Loan'],
    default: 'Available'
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

inventorySchema.index({ itemName: 'text' });

module.exports = mongoose.model('Inventory', inventorySchema);
