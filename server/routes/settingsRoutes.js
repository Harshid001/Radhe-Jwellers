const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getSettings);

router.use(protect);
router.use(checkPermission('settings'));

router.put('/', upload.single('logo'), updateSettings);

module.exports = router;
