const db = require('../models');
const logger = require('../services/logger');

class OrderService {
  async createOrder(orderData) {
    try {
      // Deconstruct order details from the payload
      const {
        guestId,
        locationId,
        items,
        paymentMethod,
        serviceFee,
        tipAmount,
        loyaltyPointsUsed,
        schedulingDetails,
        specialInstructions,
        cateringDetails,
      } = orderData;

      // Calculate total amount including service fee, discounts, etc.
      const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        serviceFee + tipAmount
      );

      // Create the order
      const newOrder = await db.Order.create({
        guestId,
        locationId,
        totalAmount,
        paymentMethod,
        serviceFee,
        tipAmount,
        loyaltyPointsUsed,
        schedulingDetails,
        specialInstructions,
        cateringDetails,
      });

      // Add ordered items
      for (const item of items) {
        await db.OrderItem.create({
          ...item,
          orderId: newOrder.id,
        });
      }

      // Log the order creation
      logger.info(`Order created: ID ${newOrder.id} for guest ID ${guestId}`);

      return newOrder;
    } catch (error) {
      logger.error(`Error creating order: ${error.message}`);
      throw error;
    }
  }

  // Method to update order status (e.g., from pending to completed)
  async updateOrderStatus(orderId, status) {
    try {
      const order = await db.Order.findByPk(orderId);
      if (!order) throw new Error('Order not found');

      order.status = status;
      await order.save();

      // Hook for additional logic (e.g., triggering notifications)
      this.onOrderStatusChange(order);

      return order;
    } catch (error) {
      logger.error(`Error updating order status: ${error.message}`);
      throw error;
    }
  }

  // Hook to handle order status change logic
  onOrderStatusChange(order) {
    if (order.status === 'completed') {
      logger.info(`Order completed: ID ${order.id}`);
      // Example: trigger guest notification or POS sync
    }
  }

  // Method to cancel an order
  async cancelOrder(orderId) {
    try {
      const order = await db.Order.findByPk(orderId);
      if (!order) throw new Error('Order not found');

      if (order.status === 'cancelled') {
        throw new Error('Order is already cancelled');
      }

      order.status = 'cancelled';
      order.cancelledAt = new Date();
      await order.save();

      logger.info(`Order cancelled: ID ${order.id}`);
      return order;
    } catch (error) {
      logger.error(`Error cancelling order: ${error.message}`);
      throw error;
    }
  }

  // Method to retrieve order details by ID
  async getOrderById(orderId) {
    try {
      const order = await db.Order.findByPk(orderId, {
        include: [{ model: db.OrderItem }, { model: db.Guest }],
      });

      if (!order) throw new Error('Order not found');

      return order;
    } catch (error) {
      logger.error(`Error retrieving order: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new OrderService();

