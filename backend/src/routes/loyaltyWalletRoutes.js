const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const loyaltyWalletController = require('../controllers/loyaltyWalletController');

// Get loyalty wallet
router.get('/:guestId', authenticateToken, loyaltyWalletController.getWallet);

// Add points to the wallet
router.post('/add-points', authenticateToken, loyaltyWalletController.addPoints);

// Redeem a reward
router.post('/redeem', authenticateToken, loyaltyWalletController.redeemReward);

module.exports = router;
