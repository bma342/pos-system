const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const CateringOrder = require('../models/CateringOrder');

// Get all catering orders for a guest
router.get('/guest/:guestId', authenticateToken, async (req, res) => {
  try {
    const orders = await CateringOrder.findAll({ where: { guestId: req.params.guestId } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering orders', error });
  }
});

// Create a new catering order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { orderNumber, guestId, houseAccountId, orderDate, totalPrice, orderDetails } = req.body;
    const cateringOrder = await CateringOrder.create({ orderNumber, guestId, houseAccountId, orderDate, totalPrice, orderDetails });
    res.status(201).json(cateringOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating catering order', error });
  }
});

module.exports = router;
