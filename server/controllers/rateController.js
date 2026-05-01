const Rate = require('../models/Rate');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Add new rate
// @route   POST /api/rates
const addRate = asyncHandler(async (req, res) => {
  const rate = await Rate.create(req.body);
  res.status(201).json(rate);
});

// @desc    Get latest rates
// @route   GET /api/rates/latest
const getLatestRates = asyncHandler(async (req, res) => {
  const purities = ['24K', '22K', '18K', '999 Silver', '925 Silver'];
  const latestRates = [];

  for (const purity of purities) {
    const rate = await Rate.findOne({ purity }).sort({ date: -1, createdAt: -1 });
    if (rate) latestRates.push(rate);
  }

  res.json(latestRates);
});

// @desc    Get rate history
// @route   GET /api/rates/history
const getRateHistory = asyncHandler(async (req, res) => {
  const { metalType, page = 1, limit = 20 } = req.query;
  
  let query = {};
  if (metalType) query.metalType = metalType;

  const total = await Rate.countDocuments(query);
  const rates = await Rate.find(query)
    .sort({ date: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({ rates, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

// @desc    Update rate
// @route   PUT /api/rates/:id
const updateRate = asyncHandler(async (req, res) => {
  const rate = await Rate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!rate) {
    res.status(404);
    throw new Error('Rate not found');
  }
  res.json(rate);
});

// @desc    Delete rate
// @route   DELETE /api/rates/:id
const deleteRate = asyncHandler(async (req, res) => {
  const rate = await Rate.findByIdAndDelete(req.params.id);
  if (!rate) {
    res.status(404);
    throw new Error('Rate not found');
  }
  res.json({ message: 'Rate deleted successfully' });
});

module.exports = { addRate, getLatestRates, getRateHistory, updateRate, deleteRate };
