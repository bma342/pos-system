const express = require('express');
const router = express.Router();
const posIntegrationSettingsController = require('../controllers/posIntegrationSettingsController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles('Admin', 'Manager'), posIntegrationSettingsController.getAllPosIntegrationSettings);
router.post('/', authorizeRoles('Admin', 'Manager'), posIntegrationSettingsController.createPosIntegrationSetting);
router.get('/:id', authorizeRoles('Admin', 'Manager'), posIntegrationSettingsController.getPosIntegrationSettingById);
router.put('/:id', authorizeRoles('Admin', 'Manager'), posIntegrationSettingsController.updatePosIntegrationSetting);
router.delete('/:id', authorizeRoles('Admin', 'Manager'), posIntegrationSettingsController.deletePosIntegrationSetting);

module.exports = router;
