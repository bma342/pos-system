const db = require('../models');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

class CateringService {
  // Function to schedule future catering orders
  static async scheduleCateringOrder(orderData) {
    try {
      const cateringOrder = await db.CateringOrder.create(orderData);
      logger.info(`Catering order scheduled successfully. Order ID: ${cateringOrder.id}`);
      return cateringOrder;
    } catch (error) {
      logger.error('Error scheduling catering order:', error);
      throw error;
    }
  }

  // Function to retrieve all scheduled catering orders within a given time range
  static async getScheduledOrders(startDate, endDate) {
    try {
      const orders = await db.CateringOrder.findAll({
        where: {
          scheduledDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [{ model: db.Guest }],
      });
      logger.info(`Retrieved ${orders.length} scheduled catering orders.`);
      return orders;
    } catch (error) {
      logger.error('Error fetching scheduled catering orders:', error);
      throw error;
    }
  }

  // Function to handle cancellations with notice period enforcement
  static async cancelCateringOrder(orderId, noticeHours = 24) {
    try {
      const order = await db.CateringOrder.findByPk(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      const now = new Date();
      const scheduledTime = new Date(order.scheduledDate);
      const timeDifference = (scheduledTime - now) / (1000 * 60 * 60); // Convert to hours

      if (timeDifference < noticeHours) {
        throw new Error(`Cannot cancel. Orders require a minimum of ${noticeHours} hours notice.`);
      }

      await order.destroy();
      logger.info(`Catering order ID ${orderId} cancelled successfully.`);
      return { message: 'Order cancelled successfully' };
    } catch (error) {
      logger.error(`Error cancelling catering order ID ${orderId}:`, error);
      throw error;
    }
  }

  // Function to process scheduled catering orders
  static async handleScheduledOrders() {
    try {
      const orders = await db.CateringOrder.findAll({
        where: {
          status: 'scheduled',
          scheduledDate: { [Op.lte]: new Date() },
        },
      });

      for (const order of orders) {
        // Logic to mark the order as "in-progress"
        order.status = 'in-progress';
        await order.save();

        // Trigger necessary preparations (e.g., kitchen, delivery, etc.)
        logger.info(`Processing scheduled catering order: Order ID ${order.id}`);

        // Mark the order as "completed"
        order.status = 'completed';
        await order.save();

        logger.info(`Catering order ID ${order.id} completed.`);
      }
    } catch (error) {
      logger.error('Error handling scheduled catering orders:', error);
      throw error;
    }
  }
}

module.exports = CateringService;
