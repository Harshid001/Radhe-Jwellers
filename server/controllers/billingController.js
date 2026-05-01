const Billing = require('../models/Billing');
const Customer = require('../models/Customer');
const Settings = require('../models/Settings');
const { generateId } = require('../utils/generateId');
const { calculateMetalValue, calculateFinalBillAmount, getPurityPercentage } = require('../utils/calculateJewelleryPrice');
const { generateBillPDF } = require('../utils/generatePDF');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Create bill
// @route   POST /api/billing
const createBill = asyncHandler(async (req, res) => {
  const { customer, transactionType, metalType, ornamentType, weight, purity, rate, makingCharges = 0, wastageCharges = 0, gstPercentage = 3, paymentMode } = req.body;

  const billNumber = await generateId('BILL');
  const purityPct = getPurityPercentage(purity);
  const metalValue = calculateMetalValue(weight, rate, purityPct);
  const { gstAmount, finalAmount } = calculateFinalBillAmount(metalValue, makingCharges, wastageCharges, gstPercentage);

  const bill = await Billing.create({
    billNumber,
    customer,
    transactionType,
    metalType,
    ornamentType,
    weight,
    purity,
    rate,
    makingCharges,
    wastageCharges,
    gstPercentage,
    gstAmount,
    metalValue,
    finalAmount,
    paymentMode,
    createdBy: req.user._id
  });

  const populatedBill = await Billing.findById(bill._id).populate('customer', 'name mobile');
  res.status(201).json(populatedBill);
});

// @desc    Get all bills
// @route   GET /api/billing
const getBills = asyncHandler(async (req, res) => {
  const { search, transactionType, metalType, page = 1, limit = 10, startDate, endDate } = req.query;
  
  let query = {};
  if (transactionType) query.transactionType = transactionType;
  if (metalType) query.metalType = metalType;
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate + 'T23:59:59');
  }
  if (search) {
    query.billNumber = { $regex: search, $options: 'i' };
  }

  const total = await Billing.countDocuments(query);
  const bills = await Billing.find(query)
    .populate('customer', 'name mobile')
    .populate('createdBy', 'name')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({ bills, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

// @desc    Get single bill
// @route   GET /api/billing/:id
const getBill = asyncHandler(async (req, res) => {
  const bill = await Billing.findById(req.params.id)
    .populate('customer', 'name mobile email address')
    .populate('createdBy', 'name');
  if (!bill) {
    res.status(404);
    throw new Error('Bill not found');
  }
  res.json(bill);
});

// @desc    Generate bill PDF
// @route   GET /api/billing/:id/pdf
const getBillPDF = asyncHandler(async (req, res) => {
  const bill = await Billing.findById(req.params.id);
  if (!bill) {
    res.status(404);
    throw new Error('Bill not found');
  }

  const customer = await Customer.findById(bill.customer);
  const settings = await Settings.findOne() || {};

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${bill.billNumber}.pdf`);

  const doc = generateBillPDF(bill, customer, settings);
  doc.pipe(res);
  doc.end();
});

// @desc    Delete bill
// @route   DELETE /api/billing/:id
const deleteBill = asyncHandler(async (req, res) => {
  const bill = await Billing.findByIdAndDelete(req.params.id);
  if (!bill) {
    res.status(404);
    throw new Error('Bill not found');
  }
  res.json({ message: 'Bill deleted successfully' });
});

module.exports = { createBill, getBills, getBill, getBillPDF, deleteBill };
