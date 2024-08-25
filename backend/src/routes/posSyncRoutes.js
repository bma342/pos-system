const express = require('express');
const router = express.Router();
const PosSyncController = require('../controllers/posSyncController');

// Route to sync menus
router.post('/sync/menus', PosSyncController.syncMenus);

// Route to sync orders
router.post('/sync/orders', PosSyncController.syncOrders);

// Route to sync inventory
router.post('/sync/inventory', PosSyncController.syncInventory);

module.exports = router;
