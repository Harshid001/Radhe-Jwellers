const express = require('express');
const router = express.Router();
const { createRepair, getRepairs, getRepair, updateRepair, updateRepairStatus, checkRepairStatus, getRepairPDF } = require('../controllers/repairController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/check-status', checkRepairStatus);

router.use(protect);

router.route('/')
  .post(checkPermission('repairs'), upload.single('ornamentPhoto'), createRepair)
  .get(checkPermission('repairs'), getRepairs);

router.get('/:id/pdf', getRepairPDF);

router.route('/:id')
  .get(checkPermission('repairs'), getRepair)
  .put(checkPermission('repairs'), upload.single('ornamentPhoto'), updateRepair)
  .delete(checkPermission('repairs'), (req, res) => res.status(405).json({ message: 'Delete not allowed for repairs' }));

router.put('/:id/status', checkPermission('repairs'), updateRepairStatus);

module.exports = router;
