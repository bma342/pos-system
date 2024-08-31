const express = require('express');
const refundController = require('../controllers/refundController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Process refund
router.post('/', authorize(['admin', 'manager']), refundController.processRefund);

// Get refund by ID
router.get('/:id', authorize(['admin', 'manager']), refundController.getRefundById);

// Get all refunds for an order
router.get('/order/:orderId', authorize(['admin', 'manager']), refundController.getRefundsByOrder);

// Update refund status
router.put('/:id/status', authorize(['admin']), refundController.updateRefundStatus);

// Cancel refund
router.post('/:id/cancel', authorize(['admin']), refundController.cancelRefund);

module.exports = router;
