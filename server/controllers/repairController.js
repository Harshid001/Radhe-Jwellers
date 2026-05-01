const Repair = require('../models/Repair');
const Customer = require('../models/Customer');
const Settings = require('../models/Settings');
const { generateId } = require('../utils/generateId');
const { generateRepairPDF } = require('../utils/generatePDF');
const { asyncHandler } = require('../middleware/errorMiddleware');

const createRepair = asyncHandler(async (req, res) => {
  const repairId = await generateId('REP');
  if (req.file) req.body.ornamentPhoto = `/uploads/${req.file.filename}`;
  const repair = await Repair.create({ ...req.body, repairId });
  const populated = await Repair.findById(repair._id).populate('customer', 'name mobile');
  res.status(201).json(populated);
});

const getRepairs = asyncHandler(async (req, res) => {
  const { search, status, page = 1, limit = 10 } = req.query;
  let query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { repairId: { $regex: search, $options: 'i' } },
      { mobile: { $regex: search, $options: 'i' } }
    ];
  }
  const total = await Repair.countDocuments(query);
  const repairs = await Repair.find(query)
    .populate('customer', 'name mobile')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json({ repairs, total, page: parseInt(page), pages: Math.ceil(total / limit) });
});

const getRepair = asyncHandler(async (req, res) => {
  const repair = await Repair.findById(req.params.id).populate('customer', 'name mobile email address');
  if (!repair) { res.status(404); throw new Error('Repair not found'); }
  res.json(repair);
});

const updateRepair = asyncHandler(async (req, res) => {
  if (req.file) req.body.ornamentPhoto = `/uploads/${req.file.filename}`;
  const repair = await Repair.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('customer', 'name mobile');
  if (!repair) { res.status(404); throw new Error('Repair not found'); }
  res.json(repair);
});

const updateRepairStatus = asyncHandler(async (req, res) => {
  const repair = await Repair.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).populate('customer', 'name mobile');
  if (!repair) { res.status(404); throw new Error('Repair not found'); }
  res.json(repair);
});

const checkRepairStatus = asyncHandler(async (req, res) => {
  const { repairId, mobile } = req.body;
  const repair = await Repair.findOne({ repairId, mobile }).populate('customer', 'name');
  if (!repair) { res.status(404); throw new Error('Repair order not found. Please check your Repair ID and mobile number.'); }
  res.json({
    repairId: repair.repairId, customerName: repair.customer?.name,
    ornamentType: repair.ornamentType, status: repair.status,
    expectedDeliveryDate: repair.expectedDeliveryDate,
    estimatedCharge: repair.estimatedCharge, finalCharge: repair.finalCharge
  });
});

const getRepairPDF = asyncHandler(async (req, res) => {
  const repair = await Repair.findById(req.params.id);
  if (!repair) { res.status(404); throw new Error('Repair not found'); }
  const customer = await Customer.findById(repair.customer);
  const settings = await Settings.findOne() || {};
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${repair.repairId}.pdf`);
  const doc = generateRepairPDF(repair, customer, settings);
  doc.pipe(res);
  doc.end();
});

module.exports = { createRepair, getRepairs, getRepair, updateRepair, updateRepairStatus, checkRepairStatus, getRepairPDF };
