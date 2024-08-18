const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const loyaltyController = require('../controllers/loyaltyController');

// Loyalty routes
router.get('/:guestId', authenticateToken, loyaltyController.getLoyaltyInfo);

module.exports = router;
