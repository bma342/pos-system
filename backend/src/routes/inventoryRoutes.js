const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all inventory items
router.get('/', authorize(['Admin', 'Manager']), inventoryController.getInventory);

// Get a single inventory item by ID
router.get('/:id', authorize(['Admin', 'Manager']), inventoryController.getInventoryItemById);

// Create a new inventory item
router.post('/', authorize(['Admin']), inventoryController.addInventoryItem);

// Update an existing inventory item
router.put('/:id', authorize(['Admin', 'Manager']), inventoryController.updateInventory);

// Delete an inventory item
router.delete('/:id', authorize(['Admin']), inventoryController.removeInventoryItem);

// Update inventory quantity
router.patch('/:id/quantity', authorize(['Admin', 'Manager']), inventoryController.updateInventoryQuantity);

module.exports = router;
