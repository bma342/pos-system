const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

router.get('/locations/:locationId/discounts', discountController.getDiscountsByLocation);

// ... other routes

module.exports = router;