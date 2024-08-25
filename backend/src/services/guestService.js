const db = require('../models');
const logger = require('../services/logger');

class GuestService {
  // Create a new guest profile
  async createGuestProfile(guestData) {
    try {
      const guest = await db.Guest.create(guestData);
      logger.info(`Guest profile created: ID ${guest.id}`);
      return guest;
    } catch (error) {
      logger.error(`Error creating guest profile: ${error.message}`);
      throw error;
    }
  }

  // Update guest profile (e.g., after an order)
  async updateGuestProfile(guestId, updates) {
    try {
      const guest = await db.Guest.findByPk(guestId);
      if (!guest) throw new Error('Guest not found');

      await guest.update(updates);
      logger.info(`Guest profile updated: ID ${guest.id}`);
      return guest;
    } catch (error) {
      logger.error(`Error updating guest profile: ${error.message}`);
      throw error;
    }
  }

  // Fetch guest order history
  async getGuestOrderHistory(guestId) {
    try {
      const orders = await db.Order.findAll({
        where: { guestId },
        include: [{ model: db.OrderItem }, { model: db.Location }],
      });
      return orders;
    } catch (error) {
      logger.error(`Error fetching guest order history: ${error.message}`);
      throw error;
    }
  }

  // Manage loyalty points (e.g., add points after an order)
  async manageLoyaltyPoints(guestId, points, operation = 'add') {
    try {
      const guest = await db.Guest.findByPk(guestId);
      if (!guest) throw new Error('Guest not found');

      guest.loyaltyPoints = operation === 'add' ? guest.loyaltyPoints + points : guest.loyaltyPoints - points;
      await guest.save();

      logger.info(`Loyalty points ${operation}ed for guest ID ${guest.id}`);
      return guest.loyaltyPoints;
    } catch (error) {
      logger.error(`Error managing loyalty points: ${error.message}`);
      throw error;
    }
  }

  // Calculate engagement metrics for a guest
  async calculateEngagementMetrics(guestId) {
    try {
      const orders = await this.getGuestOrderHistory(guestId);
      const totalOrders = orders.length;
      const totalSpend = orders.reduce((sum, order) => sum + order.totalAmount, 0);

      const engagementScore = totalSpend * totalOrders; // Example formula
      logger.info(`Engagement score calculated for guest ID ${guestId}: ${engagementScore}`);

      return { totalOrders, totalSpend, engagementScore };
    } catch (error) {
      logger.error(`Error calculating engagement metrics: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new GuestService();
