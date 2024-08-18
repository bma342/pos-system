const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const discountController = require('../controllers/discountController');

// Routes for discount management
router.post('/create', authenticateToken, authorizeRoles(1, 2), discountController.createDiscount);
router.get('/location/:locationId', authenticateToken, discountController.getDiscountsByLocation);
router.post('/schedule-drop', authenticateToken, authorizeRoles(1), discountController.scheduleDiscountDrop);

module.exports = router;
