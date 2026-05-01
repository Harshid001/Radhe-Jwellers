const express = require('express');
const router = express.Router();
const { createBill, getBills, getBill, getBillPDF, deleteBill } = require('../controllers/billingController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');

router.use(protect);

router.route('/')
  .post(checkPermission('billing'), createBill)
  .get(checkPermission('billing'), getBills);

router.get('/:id/pdf', getBillPDF);

router.route('/:id')
  .get(checkPermission('billing'), getBill)
  .delete(checkPermission('billing'), deleteBill);

module.exports = router;
