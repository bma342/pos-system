const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

// Payment routes
router.post('/process', authenticateToken, paymentController.processPayment);

module.exports = router;
