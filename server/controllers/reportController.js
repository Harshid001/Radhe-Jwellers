const Billing = require('../models/Billing');
const Repair = require('../models/Repair');
const Loan = require('../models/Loan');
const Inventory = require('../models/Inventory');
const Customer = require('../models/Customer');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Get dashboard stats
// @route   GET /api/reports/dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaySales = await Billing.aggregate([
    { $match: { transactionType: 'Sell', createdAt: { $gte: today } } },
    { $group: { _id: null, total: { $sum: '$finalAmount' } } }
  ]);

  const todayPurchases = await Billing.aggregate([
    { $match: { transactionType: 'Buy', createdAt: { $gte: today } } },
    { $group: { _id: null, total: { $sum: '$finalAmount' } } }
  ]);

  const pendingRepairs = await Repair.countDocuments({ status: { $in: ['Pending', 'In Progress'] } });
  const completedRepairs = await Repair.countDocuments({ status: 'Completed' });
  const activeLoans = await Loan.countDocuments({ status: 'Active' });
  const overdueLoans = await Loan.countDocuments({ status: 'Overdue' });
  const totalCustomers = await Customer.countDocuments();
  
  const inventoryValue = await Inventory.aggregate([
    { $group: { _id: null, total: { $sum: '$purchasePrice' } } }
  ]);

  // Monthly Sales Chart Data (Last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const monthlySales = await Billing.aggregate([
    { $match: { transactionType: 'Sell', createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
        total: { $sum: '$finalAmount' }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  res.json({
    todaySales: todaySales[0]?.total || 0,
    todayPurchases: todayPurchases[0]?.total || 0,
    pendingRepairs,
    completedRepairs,
    activeLoans,
    overdueLoans,
    totalCustomers,
    inventoryValue: inventoryValue[0]?.total || 0,
    monthlySales
  });
});

// @desc    Get sales report
// @route   GET /api/reports/sales
const getSalesReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  let query = { transactionType: 'Sell' };
  
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate + 'T23:59:59');
  }

  const sales = await Billing.find(query).populate('customer', 'name mobile').sort({ createdAt: -1 });
  res.json(sales);
});

// @desc    Get purchase report
// @route   GET /api/reports/purchases
const getPurchaseReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  let query = { transactionType: 'Buy' };
  
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate + 'T23:59:59');
  }

  const purchases = await Billing.find(query).populate('customer', 'name mobile').sort({ createdAt: -1 });
  res.json(purchases);
});

// @desc    Get repair income report
// @route   GET /api/reports/repairs
const getRepairReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  let query = { status: 'Delivered' };
  
  if (startDate || endDate) {
    query.updatedAt = {};
    if (startDate) query.updatedAt.$gte = new Date(startDate);
    if (endDate) query.updatedAt.$lte = new Date(endDate + 'T23:59:59');
  }

  const repairs = await Repair.find(query).populate('customer', 'name mobile').sort({ updatedAt: -1 });
  res.json(repairs);
});

module.exports = { getDashboardStats, getSalesReport, getPurchaseReport, getRepairReport };
