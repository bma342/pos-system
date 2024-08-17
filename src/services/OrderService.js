const { Order, Guest } = require('../models');
const logger = require('../utils/logger');

class OrderService {
  static async handleScheduledOrders() {
    try {
      // Fetch all scheduled orders that need to be processed
      const orders = await Order.findAll({
        where: {
          status: 'scheduled', // Assuming 'scheduled' is a status for orders waiting to be processed
          scheduledTime: { // Orders scheduled to be processed within the next 5 minutes
            $lte: new Date(Date.now() + 5 * 60000)
          }
        },
        include: [Guest],
      });

      if (orders.length === 0) {
        logger.info('No scheduled guest orders to process.');
        return;
      }

      for (const order of orders) {
        // Process each order
        logger.info(`Processing scheduled order for guest: ${order.Guest.name}, Order ID: ${order.id}`);

        // Logic to mark the order as "in-progress" or any other processing status
        order.status = 'in-progress';
        await order.save();

        // Send notifications, prepare items, etc.

        // Mark the order as "completed"
        order.status = 'completed';
        await order.save();

        logger.info(`Order ID ${order.id} for guest ${order.Guest.name} completed.`);
      }
    } catch (error) {
      logger.error('Error handling scheduled guest orders:', error);
    }
  }
}

module.exports = OrderService;
