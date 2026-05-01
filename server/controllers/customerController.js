const Customer = require('../models/Customer');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Create customer
// @route   POST /api/customers
const createCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
});

// @desc    Get all customers
// @route   GET /api/customers
const getCustomers = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  
  let query = {};
  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } }
      ]
    };
  }

  const total = await Customer.countDocuments(query);
  const customers = await Customer.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    customers,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit)
  });
});

// @desc    Get single customer
// @route   GET /api/customers/:id
const getCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }
  res.json(customer);
});

// @desc    Update customer
// @route   PUT /api/customers/:id
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }
  res.json(customer);
});

// @desc    Delete customer
// @route   DELETE /api/customers/:id
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }
  res.json({ message: 'Customer deleted successfully' });
});

module.exports = { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer };
