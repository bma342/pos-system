const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Order = require('../models/Order');

// Cancel an order (with time restriction)
router.put('/:orderId/cancel', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.isCancelled) return res.status(400).json({ message: 'Order is already cancelled' });

    const currentTime = new Date();
    const orderTime = new Date(order.orderDate);
    const cutoffTime = new Date(orderTime.getTime() - order.cancellationCutoff * 60 * 60 * 1000);

    if (currentTime > cutoffTime) {
      return res.status(400).json({ message: `Cannot cancel order. Cancellations require at least ${order.cancellationCutoff} hours' notice.` });
    }

    order.isCancelled = true;
    order.cancelledAt = currentTime;
    await order.save();

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
