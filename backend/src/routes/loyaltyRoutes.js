const express = require('express');
const loyaltyController = require('../controllers/loyaltyController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get loyalty program details
router.get('/program/:clientId', authorize(['admin', 'manager']), loyaltyController.getLoyaltyProgram);

// Create or update loyalty program
router.post('/program', authorize(['admin']), loyaltyController.createOrUpdateLoyaltyProgram);

// Get customer loyalty points
router.get('/points/:customerId', authorize(['admin', 'manager', 'customer']), loyaltyController.getCustomerPoints);

// Add loyalty points
router.post('/points/add', authorize(['admin', 'manager']), loyaltyController.addLoyaltyPoints);

// Redeem loyalty points
router.post('/points/redeem', authorize(['admin', 'manager', 'customer']), loyaltyController.redeemLoyaltyPoints);

// Get loyalty tiers
router.get('/tiers/:clientId', authorize(['admin', 'manager']), loyaltyController.getLoyaltyTiers);

// Create loyalty tier
router.post('/tiers', authorize(['admin']), loyaltyController.createLoyaltyTier);

// Update loyalty tier
router.put('/tiers/:tierId', authorize(['admin']), loyaltyController.updateLoyaltyTier);

// Delete loyalty tier
router.delete('/tiers/:tierId', authorize(['admin']), loyaltyController.deleteLoyaltyTier);

// Get loyalty rewards
router.get('/rewards/:clientId', authorize(['admin', 'manager', 'customer']), loyaltyController.getLoyaltyRewards);

// Create loyalty reward
router.post('/rewards', authorize(['admin']), loyaltyController.createLoyaltyReward);

// Update loyalty reward
router.put('/rewards/:rewardId', authorize(['admin']), loyaltyController.updateLoyaltyReward);

// Delete loyalty reward
router.delete('/rewards/:rewardId', authorize(['admin']), loyaltyController.deleteLoyaltyReward);

module.exports = router;
