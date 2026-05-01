const express = require('express');
const router = express.Router();
const { createLoan, getLoans, getLoan, updateLoan, addPayment, closeLoan, checkLoanStatus, getLoanPDF } = require('../controllers/loanController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/check-status', checkLoanStatus);

router.use(protect);

router.route('/')
  .post(checkPermission('loans'), upload.single('ornamentPhoto'), createLoan)
  .get(checkPermission('loans'), getLoans);

router.get('/:id/pdf', getLoanPDF);

router.route('/:id')
  .get(checkPermission('loans'), getLoan)
  .put(checkPermission('loans'), upload.single('ornamentPhoto'), updateLoan);

router.put('/:id/payment', checkPermission('loans'), addPayment);
router.put('/:id/close', checkPermission('loans'), closeLoan);

module.exports = router;
