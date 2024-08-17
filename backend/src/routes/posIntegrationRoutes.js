const express = require('express');
const router = express.Router();
const PosIntegrationController = require('../controllers/posIntegrationController');
const { authenticateToken } = require('../middleware/auth');

router.post('/sync-menus', authenticateToken, PosIntegrationController.syncMenus);
router.post('/sync-orders', authenticateToken, PosIntegrationController.syncOrders);
router.post('/sync-inventory', authenticateToken, PosIntegrationController.syncInventory);

module.exports = router;
