const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const loyaltyController = require('../controllers/loyaltyController');

// Loyalty routes
router.get('/:guestId', authenticateToken, loyaltyController.getLoyaltyProgram);
router.put('/:clientId', authenticateToken, loyaltyController.updateLoyaltyProgram);
router.post('/challenge', authenticateToken, loyaltyController.upsertLoyaltyChallenge);
router.delete('/challenge/:id', authenticateToken, loyaltyController.deleteLoyaltyChallenge);

module.exports = router;
