const express = require('express');
const walletController = require('../controllers/walletController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get wallet balance
router.get('/balance', authorize(['user', 'admin']), walletController.getWalletBalance);

// Add funds to wallet
router.post('/add-funds', authorize(['user', 'admin']), walletController.addFunds);

// Withdraw funds from wallet
router.post('/withdraw', authorize(['user', 'admin']), walletController.withdrawFunds);

// Get transaction history
router.get('/transactions', authorize(['user', 'admin']), walletController.getTransactionHistory);

// Transfer funds to another user
router.post('/transfer', authorize(['user', 'admin']), walletController.transferFunds);

// Get wallet details
router.get('/:userId', authorize(['admin']), walletController.getWalletDetails);

module.exports = router;
