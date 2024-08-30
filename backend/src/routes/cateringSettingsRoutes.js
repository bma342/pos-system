const express = require('express');
const router = express.Router();
const cateringSettingsController = require('../controllers/cateringSettingsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), cateringSettingsController.getSettings);
router.put('/', authorizeRoles(1, 2), cateringSettingsController.updateSettings);

module.exports = router;
