const express = require('express');
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Process payment
router.post('/process', authorize(['admin', 'manager', 'customer']), paymentController.processPayment);

// Get payment by ID
router.get('/:id', authorize(['admin', 'manager']), paymentController.getPaymentById);

// Refund payment
router.post('/refund', authorize(['admin', 'manager']), paymentController.refundPayment);

// Get payment methods for a client
router.get('/methods/:clientId', authorize(['admin', 'manager', 'customer']), paymentController.getPaymentMethods);

// Add payment method
router.post('/methods', authorize(['admin', 'manager', 'customer']), paymentController.addPaymentMethod);

// Update payment method
router.put('/methods/:methodId', authorize(['admin', 'manager', 'customer']), paymentController.updatePaymentMethod);

// Delete payment method
router.delete('/methods/:methodId', authorize(['admin', 'manager', 'customer']), paymentController.deletePaymentMethod);

module.exports = router;