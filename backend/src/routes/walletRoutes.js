const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const walletController = require('../controllers/walletController');

// Wallet Routes
router.get('/balance', authenticateToken, walletController.getWalletBalance);
router.post('/add-discount', authenticateToken, walletController.addDiscountToWallet);
router.get('/discounts', authenticateToken, walletController.getWalletDiscounts);

module.exports = router;
