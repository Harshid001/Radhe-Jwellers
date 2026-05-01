const Settings = require('../models/Settings');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get settings
// @route   GET /api/settings
const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  res.json(settings);
});

// @desc    Update settings
// @route   PUT /api/settings
const updateSettings = asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.logo = `/uploads/${req.file.filename}`;
  }

  let settings = await Settings.findOne();
  if (settings) {
    settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
  } else {
    settings = await Settings.create(req.body);
  }
  res.json(settings);
});

module.exports = { getSettings, updateSettings };
