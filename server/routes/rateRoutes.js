const express = require('express');
const router = express.Router();
const { addRate, getLatestRates, getRateHistory, updateRate, deleteRate } = require('../controllers/rateController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');

router.get('/latest', getLatestRates);
router.get('/history', getRateHistory);

router.use(protect);

router.post('/', checkPermission('rates'), addRate);
router.route('/:id')
  .put(checkPermission('rates'), updateRate)
  .delete(checkPermission('rates'), deleteRate);

module.exports = router;
