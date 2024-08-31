const express = require('express');
const commissaryKitchenController = require('../controllers/commissaryKitchenController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all commissary kitchens
router.get('/', authorize(['admin', 'manager']), commissaryKitchenController.getAllCommissaryKitchens);

// Get a specific commissary kitchen
router.get('/:id', authorize(['admin', 'manager']), commissaryKitchenController.getCommissaryKitchenById);

// Create a new commissary kitchen
router.post('/', authorize(['admin']), commissaryKitchenController.createCommissaryKitchen);

// Update a commissary kitchen
router.put('/:id', authorize(['admin']), commissaryKitchenController.updateCommissaryKitchen);

// Delete a commissary kitchen
router.delete('/:id', authorize(['admin']), commissaryKitchenController.deleteCommissaryKitchen);

// Get inventory for a commissary kitchen
router.get('/:id/inventory', authorize(['admin', 'manager']), commissaryKitchenController.getCommissaryKitchenInventory);

// Update inventory for a commissary kitchen
router.put('/:id/inventory', authorize(['admin', 'manager']), commissaryKitchenController.updateCommissaryKitchenInventory);

module.exports = router;
