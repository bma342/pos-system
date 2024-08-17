const db = require('../models');

class ReportService {
  static async generateSalesReport(clientId, startDate, endDate) {
    try {
      // Fetch orders within the date range for the specified client
      const orders = await db.Order.findAll({
        where: {
          clientId: clientId,
          orderDate: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        },
        include: [
          { model: db.Location },
          { model: db.MenuItem },
        ],
      });

      // Process the orders to generate the sales report
      const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);
      const totalOrders = orders.length;

      // Add more data points as needed
      const report = {
        clientId,
        startDate,
        endDate,
        totalRevenue,
        totalOrders,
        orders, // Detailed orders included in the report
      };

      return report;
    } catch (error) {
      console.error('Error generating sales report:', error);
      throw error;
    }
  }

  // Add more report types as needed
  static async generateOrderHistoryReport(clientId, guestId) {
    try {
      // Fetch all orders for a specific guest
      const orderHistory = await db.Order.findAll({
        where: {
          clientId: clientId,
          guestId: guestId,
        },
        include: [
          { model: db.MenuItem },
          { model: db.Location },
        ],
      });

      return orderHistory;
    } catch (error) {
      console.error('Error generating order history report:', error);
      throw error;
    }
  }
}

module.exports = ReportService;
