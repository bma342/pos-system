const { Order } = require('../models');

class OrderController {
  static async cancelOrder(req, res) {
    try {
      const { orderId } = req.params;
      const order = await Order.findByPk(orderId);

      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }

      if (req.user.role === 'manager' || req.user.role === 'admin') {
        // Managers and admins can cancel orders without restrictions
        await order.update({ isCancelled: true, cancelledAt: new Date(), status: 'cancelled' });
        return res.status(200).json({ message: 'Order cancelled successfully.' });
      } else {
        // Guests can only cancel orders outside of the prep window
        if (order.canBeCancelledByGuest()) {
          await order.update({ isCancelled: true, cancelledAt: new Date(), status: 'cancelled' });
          return res.status(200).json({ message: 'Order cancelled successfully.' });
        } else {
          return res.status(400).json({ message: 'Order cannot be cancelled within the prep time.' });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  static async getOrderHistory(req, res) {
    try {
      const guestId = req.user.id;
      const orders = await Order.findAll({
        where: { guestId },
        order: [['orderDate', 'DESC']],
        include: [{ model: Location }, { model: MenuItem }]
      });

      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch order history', error });
    }
  }
}

module.exports = OrderController;

