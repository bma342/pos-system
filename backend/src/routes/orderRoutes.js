const express = require('express');
const OrderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Order routes
router.get('/history', authenticate, authorize(['User', 'Admin']), OrderController.getOrderHistory);
router.post('/', authenticate, authorize(['User']), OrderController.createOrder); // Changed to createOrder
router.get('/:orderId', authenticate, authorize(['User', 'Admin']), OrderController.getOrderDetails);
router.put('/:orderId/cancel', authenticate, authorize(['User']), OrderController.cancelOrder);
router.put('/:orderId/status', authenticate, authorize(['Admin']), OrderController.updateOrderStatus);

module.exports = router;
