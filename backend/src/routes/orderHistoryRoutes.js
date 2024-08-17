const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Order = require('../models/Order');

// Get order history for a guest
router.get('/guest/:guestId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { guestId: req.params.guestId } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error });
  }
});

module.exports = router;
