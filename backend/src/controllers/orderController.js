const { Order, Location, MenuItem } = require('../models');
const orderService = require('../services/orderService');
const logger = require('../utils/logger');

class OrderController {
  static async cancelOrder(req, res) {
    // Existing implementation
  }

  static async getOrderHistory(req, res) {
    // Existing implementation
  }

  static async createOrder(req, res) {
    try {
      const order = await orderService.createOrder(req.body);
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
}

module.exports = {
  cancelOrder: OrderController.cancelOrder,
  getOrderHistory: OrderController.getOrderHistory,
  createOrder: OrderController.createOrder,
  getOrderDetails: OrderController.getOrderDetails,
  updateOrderStatus: OrderController.updateOrderStatus
};
