const express = require('express');
const router = express.Router();
const PosIntegrationController = require('../controllers/posIntegrationController');

// Route to trigger menu sync
router.post('/sync/menus', PosIntegrationController.syncMenus);

// Route to trigger order sync
router.post('/sync/orders', PosIntegrationController.syncOrders);

// Route to trigger inventory sync
router.post('/sync/inventory', PosIntegrationController.syncInventory);

// Route to trigger tax rates sync (if applicable)
router.post('/sync/tax-rates', PosIntegrationController.syncTaxRates);

module.exports = router;
