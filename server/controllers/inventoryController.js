const Inventory = require('../models/Inventory');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Create inventory item
// @route   POST /api/inventory
const createItem = asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  const item = await Inventory.create(req.body);
  res.status(201).json(item);
});

// @desc    Get all inventory items
// @route   GET /api/inventory
const getItems = asyncHandler(async (req, res) => {
  const { search, metalType, category, status, page = 1, limit = 10 } = req.query;
  
  let query = {};
  if (metalType) query.metalType = metalType;
  if (category) query.category = category;
  if (status) query.status = status;
  if (search) {
    query.itemName = { $regex: search, $options: 'i' };
  }

  const total = await Inventory.countDocuments(query);
  const items = await Inventory.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({ items, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

// @desc    Get single item
// @route   GET /api/inventory/:id
const getItem = asyncHandler(async (req, res) => {
  const item = await Inventory.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  res.json(item);
});

// @desc    Update item
// @route   PUT /api/inventory/:id
const updateItem = asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  res.json(item);
});

// @desc    Delete item
// @route   DELETE /api/inventory/:id
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Inventory.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  res.json({ message: 'Item deleted successfully' });
});

module.exports = { createItem, getItems, getItem, updateItem, deleteItem };
