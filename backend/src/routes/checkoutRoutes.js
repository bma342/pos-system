const express = require('express');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Initialize checkout process
router.post('/initialize', authorize(['user', 'admin']), checkoutController.initializeCheckout);

// Process payment
router.post('/process-payment', authorize(['user', 'admin']), checkoutController.processPayment);

// Confirm order
router.post('/confirm-order', authorize(['user', 'admin']), checkoutController.confirmOrder);

// Get checkout status
router.get('/status/:checkoutId', authorize(['user', 'admin']), checkoutController.getCheckoutStatus);

// Apply coupon
router.post('/apply-coupon', authorize(['user', 'admin']), checkoutController.applyCoupon);

// Remove coupon
router.post('/remove-coupon', authorize(['user', 'admin']), checkoutController.removeCoupon);

// Update shipping address
router.put('/shipping-address', authorize(['user', 'admin']), checkoutController.updateShippingAddress);

// Get available payment methods
router.get('/payment-methods', authorize(['user', 'admin']), checkoutController.getPaymentMethods);

module.exports = router;
