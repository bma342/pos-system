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
