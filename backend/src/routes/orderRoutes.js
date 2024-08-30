const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

// Order routes
router.get('/history', authenticateToken, authorizeRoles('User', 'Admin'), OrderController.getOrderHistory);
router.put('/cancel/:orderId', authenticateToken, authorizeRoles('User', 'Admin'), OrderController.cancelOrder);

module.exports = router;
