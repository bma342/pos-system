const db = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { guestId, locationId, items, paymentMethod, serviceFee, tipAmount, loyaltyPointsUsed } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0) + serviceFee + tipAmount;

    // Create the order
    const order = await db.Order.create({
      guestId,
      locationId,
      totalAmount,
      paymentMethod,
      serviceFee,
      tipAmount,
      loyaltyPointsUsed,
    });

    // Add ordered items
    for (const item of items) {
      await db.MenuItem.create({
        ...item,
        orderId: order.id,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await db.Order.findByPk(req.params.orderId, {
      include: [{ model: db.MenuItem }, { model: db.Guest }],
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await db.Order.findByPk(req.params.orderId);

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
};
