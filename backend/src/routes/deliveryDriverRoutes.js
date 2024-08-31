const express = require('express');
const deliveryDriverController = require('../controllers/deliveryDriverController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all delivery drivers
router.get('/', authorize(['admin', 'manager']), deliveryDriverController.getAllDeliveryDrivers);

// Get a specific delivery driver
router.get('/:id', authorize(['admin', 'manager']), deliveryDriverController.getDeliveryDriverById);

// Create a new delivery driver
router.post('/', authorize(['admin']), deliveryDriverController.createDeliveryDriver);

// Update a delivery driver
router.put('/:id', authorize(['admin']), deliveryDriverController.updateDeliveryDriver);

// Delete a delivery driver
router.delete('/:id', authorize(['admin']), deliveryDriverController.deleteDeliveryDriver);

// Get active deliveries for a driver
router.get('/:id/active-deliveries', authorize(['admin', 'manager', 'driver']), deliveryDriverController.getActiveDeliveries);

// Update delivery status
router.put('/:id/delivery/:deliveryId', authorize(['admin', 'manager', 'driver']), deliveryDriverController.updateDeliveryStatus);

module.exports = router;
