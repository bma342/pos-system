const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const discountController = require('../controllers/discountController');

// Create a discount (Admin or higher)
router.post('/', authenticateToken, authorizeRoles(1, 2), discountController.createDiscount);

// Get all discounts for a specific location
router.get('/:locationId', authenticateToken, discountController.getDiscountsByLocation);

module.exports = router;
