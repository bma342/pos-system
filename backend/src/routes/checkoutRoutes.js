const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middleware/auth');

router.post('/checkout', authMiddleware.authenticateToken, checkoutController.checkout);

module.exports = router;
