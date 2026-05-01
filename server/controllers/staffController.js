const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get all staff
// @route   GET /api/staff
const getStaff = asyncHandler(async (req, res) => {
  const staff = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(staff);
});

// @desc    Add staff
// @route   POST /api/staff
const addStaff = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const user = await User.create({ name, email, password, role });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive
  });
});

// @desc    Update staff
// @route   PUT /api/staff/:id
const updateStaff = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    if (req.body.isActive !== undefined) user.isActive = req.body.isActive;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isActive: updatedUser.isActive
    });
  } else {
    res.status(404);
    throw new Error('Staff user not found');
  }
});

// @desc    Delete staff
// @route   DELETE /api/staff/:id
const deleteStaff = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.role === 'Admin') {
      const adminCount = await User.countDocuments({ role: 'Admin' });
      if (adminCount <= 1) {
        res.status(400);
        throw new Error('Cannot delete the last admin');
      }
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'Staff removed' });
  } else {
    res.status(404);
    throw new Error('Staff user not found');
  }
});

module.exports = { getStaff, addStaff, updateStaff, deleteStaff };
