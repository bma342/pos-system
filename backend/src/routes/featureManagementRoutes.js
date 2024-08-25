const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const featureManagementController = require('../controllers/featureManagementController');

const router = express.Router();

router.get('/features/:clientId', authenticateToken, authorizeRoles('Super Admin'), featureManagementController.getClientFeatures);
router.put('/features/:clientId', authenticateToken, authorizeRoles('Super Admin'), featureManagementController.updateClientFeatures);

module.exports = router;
