const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Checkout route
router.post('/', checkoutController.checkout);

module.exports = router;
