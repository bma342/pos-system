const express = require('express');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const cateringController = require('../controllers/cateringController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get catering menu for a specific location
router.get('/location/:locationId', authorize(['admin', 'manager']), cateringController.getCateringMenu);

// Create a new catering order
router.post('/order', authorize(['admin', 'manager', 'user']), cateringController.createCateringOrder);

// Get catering order details
router.get('/order/:orderId', authorize(['admin', 'manager', 'user']), cateringController.getCateringOrderDetails);

// Update catering order status
router.put('/order/:orderId/status', authorize(['admin', 'manager']), cateringController.updateCateringOrderStatus);

// Get all catering orders for a client
router.get('/orders', authorize(['admin', 'manager']), cateringController.getAllCateringOrders);

// Create or update catering menu item
router.post('/menu-item', authorize(['admin']), cateringController.upsertCateringMenuItem);

// Delete catering menu item
router.delete('/menu-item/:itemId', authorize(['admin']), cateringController.deleteCateringMenuItem);

module.exports = router;
