const express = require('express');
const router = express.Router();
const { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');

router.use(protect);

router.route('/')
  .post(checkPermission('customers'), createCustomer)
  .get(getCustomers);

router.route('/:id')
  .get(getCustomer)
  .put(checkPermission('customers'), updateCustomer)
  .delete(checkPermission('customers'), deleteCustomer);

module.exports = router;
