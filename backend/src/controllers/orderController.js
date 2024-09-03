const { Order, Location, MenuItem } = require('../models');
const orderService = require('../services/orderService');
const logger = require('../utils/logger');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Modifier = require('../models/Modifier');

class OrderController {
  static async cancelOrder(req, res) {
    // Existing implementation
  }

  static async getOrderHistory(req, res) {
    // Existing implementation
  }

  static async createOrder(req, res) {
    try {
      const { clientId, customerId, items, total, status } = req.body;
      const order = await Order.create({ clientId, customerId, total, status });

      for (const item of items) {
        const orderItem = await OrderItem.create({ ...item, orderId: order.id });
        if (item.modifiers) {
          for (const modifier of item.modifiers) {
            await Modifier.create({ ...modifier, orderItemId: orderItem.id });
          }
        }
      }

      res.status(201).json(order);
    } catch (error) {
      logger.error(`Error creating order: ${error.message}`);
      res.status(500).json({ message: 'Error creating order', error: error.message });
    }
  }

  static async getOrderDetails(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      logger.error(`Error fetching order details: ${error.message}`);
      res.status(500).json({ message: 'Error fetching order details', error: error.message });
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const updatedOrder = await orderService.updateOrderStatus(req.params.orderId, req.body.status);
      res.status(200).json(updatedOrder);
    } catch (error) {
      logger.error(`Error updating order status: ${error.message}`);
      res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
  }

  static async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [{ model: OrderItem, include: [Modifier] }]
      });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {
  cancelOrder: OrderController.cancelOrder,
  getOrderHistory: OrderController.getOrderHistory,
  createOrder: OrderController.createOrder,
  getOrderDetails: OrderController.getOrderDetails,
  updateOrderStatus: OrderController.updateOrderStatus,
  getOrder: OrderController.getOrder
};
