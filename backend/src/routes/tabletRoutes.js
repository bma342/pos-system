const express = require('express');
const tabletController = require('../controllers/tabletController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all tablets
router.get('/', authorize(['admin', 'manager']), tabletController.getAllTablets);

// Get a specific tablet
router.get('/:id', authorize(['admin', 'manager']), tabletController.getTabletById);

// Create a new tablet
router.post('/', authorize(['admin']), tabletController.createTablet);

// Update a tablet
router.put('/:id', authorize(['admin']), tabletController.updateTablet);

// Delete a tablet
router.delete('/:id', authorize(['admin']), tabletController.deleteTablet);

// Get tablets for a specific location
router.get('/location/:locationId', authorize(['admin', 'manager']), tabletController.getTabletsByLocation);

// Sync tablet data
router.post('/:id/sync', authorize(['admin', 'manager']), tabletController.syncTabletData);

module.exports = router;