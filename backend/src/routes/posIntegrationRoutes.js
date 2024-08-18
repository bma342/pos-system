const express = require('express');
const router = express.Router();
const PosIntegrationController = require('../controllers/posIntegrationController');
const { authenticateToken } = require('../middleware/auth');

// Sync routes for menus, orders, and inventory
router.post('/sync-menus', authenticateToken, PosIntegrationController.syncMenus);
router.post('/sync-orders', authenticateToken, PosIntegrationController.syncOrders);
router.post('/sync-inventory', authenticateToken, PosIntegrationController.syncInventory);

// Report in-store order to sync with loyalty and order history
router.post('/report-instore-order', authenticateToken, PosIntegrationController.reportInStoreOrder);

module.exports = router;
