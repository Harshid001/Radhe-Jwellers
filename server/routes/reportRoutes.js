const express = require('express');
const router = express.Router();
const { getDashboardStats, getSalesReport, getPurchaseReport, getRepairReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');

router.use(protect);

router.get('/dashboard', getDashboardStats);
router.get('/sales', checkPermission('reports'), getSalesReport);
router.get('/purchases', checkPermission('reports'), getPurchaseReport);
router.get('/repairs', checkPermission('reports'), getRepairReport);

module.exports = router;
