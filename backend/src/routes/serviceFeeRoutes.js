const express = require('express');
const serviceFeeController = require('../controllers/serviceFeeController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all service fees
router.get('/', authorize(['admin', 'manager']), serviceFeeController.getAllServiceFees);

// Get a specific service fee
router.get('/:id', authorize(['admin', 'manager']), serviceFeeController.getServiceFeeById);

// Create a new service fee
router.post('/', authorize(['admin']), serviceFeeController.createServiceFee);

// Update a service fee
router.put('/:id', authorize(['admin']), serviceFeeController.updateServiceFee);

// Delete a service fee
router.delete('/:id', authorize(['admin']), serviceFeeController.deleteServiceFee);

// Get service fees for a specific client
router.get('/client/:clientId', authorize(['admin', 'manager']), serviceFeeController.getServiceFeesByClient);

module.exports = router;
