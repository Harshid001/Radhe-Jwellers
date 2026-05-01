const express = require('express');
const router = express.Router();
const { createItem, getItems, getItem, updateItem, deleteItem } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.use(protect);

router.route('/')
  .post(checkPermission('inventory'), upload.single('image'), createItem)
  .get(checkPermission('inventory'), getItems);

router.route('/:id')
  .get(checkPermission('inventory'), getItem)
  .put(checkPermission('inventory'), upload.single('image'), updateItem)
  .delete(checkPermission('inventory'), deleteItem);

module.exports = router;
