const express = require('express');
const router = express.Router();
const { getStaff, addStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(checkPermission('staff'));

router.route('/')
  .get(getStaff)
  .post(addStaff);

router.route('/:id')
  .put(updateStaff)
  .delete(deleteStaff);

module.exports = router;
