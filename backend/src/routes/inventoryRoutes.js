const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

// Routes for inventory management
router.get('/online/:locationId', authenticateToken, inventoryController.getOnlineInventory);
router.post('/set-buffer', authenticateToken, authorizeRoles('Admin', 'Manager'), inventoryController.setOnlineInventoryBuffer);
router.post('/sync', authenticateToken, authorizeRoles('Admin', 'Manager'), inventoryController.syncInventory);

module.exports = router;
