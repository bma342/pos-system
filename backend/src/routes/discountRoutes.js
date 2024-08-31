const express = require('express');
const discountController = require('../controllers/discountController');
const { authenticate } = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all discounts
router.get('/', authorize(['admin', 'manager']), discountController.getAllDiscounts);

// Get a specific discount
router.get('/:id', authorize(['admin', 'manager']), discountController.getDiscountById);

// Create a new discount
router.post('/', authorize(['admin']), discountController.createDiscount);

// Update a discount
router.put('/:id', authorize(['admin']), discountController.updateDiscount);

// Delete a discount
router.delete('/:id', authorize(['admin']), discountController.deleteDiscount);

module.exports = router;
