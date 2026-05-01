const Loan = require('../models/Loan');
const Payment = require('../models/Payment');
const Customer = require('../models/Customer');
const Settings = require('../models/Settings');
const { generateId } = require('../utils/generateId');
const { calculateLoanAmount, calculateInterest, calculateFinalPayable, calculateMetalValue, getPurityPercentage } = require('../utils/calculateJewelleryPrice');
const { generateLoanPDF } = require('../utils/generatePDF');
const { asyncHandler } = require('../middleware/errorMiddleware');

const createLoan = asyncHandler(async (req, res) => {
  const loanId = await generateId('LOAN');
  if (req.file) req.body.ornamentPhoto = `/uploads/${req.file.filename}`;
  
  const { weight, purity, loanPercentage, monthlyInterestRate, durationMonths, penalty = 0 } = req.body;
  const rate = parseFloat(req.body.rate || 0);
  const purityPct = getPurityPercentage(purity);
  const estimatedValue = calculateMetalValue(weight, rate, purityPct);
  const loanAmount = calculateLoanAmount(estimatedValue, loanPercentage);
  const interestAmount = calculateInterest(loanAmount, monthlyInterestRate, durationMonths);
  const finalPayableAmount = calculateFinalPayable(loanAmount, interestAmount, penalty);
  
  const startDate = new Date();
  const dueDate = new Date();
  dueDate.setMonth(dueDate.getMonth() + parseInt(durationMonths));

  const loan = await Loan.create({
    ...req.body, loanId, estimatedValue, loanAmount, interestAmount,
    finalPayableAmount, remainingAmount: finalPayableAmount,
    startDate, dueDate
  });
  const populated = await Loan.findById(loan._id).populate('customer', 'name mobile');
  res.status(201).json(populated);
});

const getLoans = asyncHandler(async (req, res) => {
  const { search, status, page = 1, limit = 10 } = req.query;
  let query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { loanId: { $regex: search, $options: 'i' } },
      { mobile: { $regex: search, $options: 'i' } }
    ];
  }
  const total = await Loan.countDocuments(query);
  const loans = await Loan.find(query)
    .populate('customer', 'name mobile')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json({ loans, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

const getLoan = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id).populate('customer', 'name mobile email address idProofType idProofNumber');
  if (!loan) { res.status(404); throw new Error('Loan not found'); }
  const payments = await Payment.find({ loan: loan._id }).sort({ paymentDate: -1 });
  res.json({ loan, payments });
});

const updateLoan = asyncHandler(async (req, res) => {
  if (req.file) req.body.ornamentPhoto = `/uploads/${req.file.filename}`;
  const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('customer', 'name mobile');
  if (!loan) { res.status(404); throw new Error('Loan not found'); }
  res.json(loan);
});

const addPayment = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) { res.status(404); throw new Error('Loan not found'); }
  
  const { amount, paymentMode = 'Cash', note = '' } = req.body;
  const payment = await Payment.create({
    customer: loan.customer, loan: loan._id,
    amount, paymentMode, note
  });
  
  loan.paidAmount += amount;
  loan.remainingAmount = loan.finalPayableAmount - loan.paidAmount;
  if (loan.remainingAmount <= 0) {
    loan.remainingAmount = 0;
    loan.status = 'Closed';
  }
  await loan.save();
  
  res.status(201).json({ payment, loan });
});

const closeLoan = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) { res.status(404); throw new Error('Loan not found'); }
  loan.status = 'Closed';
  loan.remainingAmount = 0;
  loan.paidAmount = loan.finalPayableAmount;
  await loan.save();
  res.json(loan);
});

const checkLoanStatus = asyncHandler(async (req, res) => {
  const { loanId, mobile } = req.body;
  const loan = await Loan.findOne({ loanId, mobile }).populate('customer', 'name');
  if (!loan) { res.status(404); throw new Error('Loan not found. Please check your Loan ID and mobile number.'); }
  res.json({
    loanId: loan.loanId, customerName: loan.customer?.name,
    loanAmount: loan.loanAmount, interestAmount: loan.interestAmount,
    dueDate: loan.dueDate, status: loan.status,
    finalPayableAmount: loan.finalPayableAmount,
    paidAmount: loan.paidAmount, remainingAmount: loan.remainingAmount
  });
});

const getLoanPDF = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) { res.status(404); throw new Error('Loan not found'); }
  const customer = await Customer.findById(loan.customer);
  const settings = await Settings.findOne() || {};
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${loan.loanId}.pdf`);
  const doc = generateLoanPDF(loan, customer, settings);
  doc.pipe(res);
  doc.end();
});

module.exports = { createLoan, getLoans, getLoan, updateLoan, addPayment, closeLoan, checkLoanStatus, getLoanPDF };
