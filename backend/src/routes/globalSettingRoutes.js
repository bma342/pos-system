const express = require('express');
const router = express.Router();
const globalSettingController = require('../controllers/globalSettingController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', authorizeRoles(1, 2), globalSettingController.getAllGlobalSettings);
router.get('/:id', authorizeRoles(1, 2), globalSettingController.getGlobalSettingById);
router.post('/', authorizeRoles(1, 2), globalSettingController.createGlobalSetting);
router.put('/:id', authorizeRoles(1, 2), globalSettingController.updateGlobalSetting);
router.delete('/:id', authorizeRoles(1, 2), globalSettingController.deleteGlobalSetting);

module.exports = router;
