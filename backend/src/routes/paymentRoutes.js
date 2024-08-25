const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

// Payment profile routes
router.post('/profile', authenticateToken, paymentController.createPaymentProfile);
router.put('/profile/:id', authenticateToken, paymentController.updatePaymentProfile);
router.delete('/profile/:id', authenticateToken, paymentController.deletePaymentProfile);

// Payment processing
router.post('/process', authenticateToken, paymentController.processPayment);

module.exports = router;
