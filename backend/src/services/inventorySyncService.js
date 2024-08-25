const axios = require('axios');
const db = require('../models');
const logger = require('./logger');

class InventorySyncService {
  async syncInventory(posProfile) {
    try {
      const inventory = await db.Inventory.findAll({
        where: { locationId: posProfile.locationId },
        attributes: ['itemName', 'quantity', 'sku'],
      });

      const formattedInventory = inventory.map((item) => ({
        itemName: item.itemName,
        quantity: item.quantity,
        sku: item.sku,
      }));

      const response = await axios.post(`${posProfile.apiBaseUrl}/inventory`, formattedInventory, {
        headers: {
          Authorization: `Bearer ${posProfile.clientSecret}`,
          'Content-Type': posProfile.contentType || 'application/json',
        },
      });

      if (response.status === 200) {
        logger.info(`Inventory sync successful for location ${posProfile.locationId}`);
      } else {
        logger.error(`Inventory sync failed: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing inventory: ${error.message}`);
      throw error;
    }
  }

  // Check inventory levels and trigger alerts if low
  async checkLowInventory(locationId) {
    try {
      const lowStockItems = await db.Inventory.findAll({
        where: {
          locationId,
          quantity: { [db.Sequelize.Op.lt]: 10 }, // Example threshold for low stock
        },
      });

      if (lowStockItems.length > 0) {
        logger.warn(`Low stock alert for location ID ${locationId}`);
        // Example: Trigger notification or restock order
      }

      return lowStockItems;
    } catch (error) {
      logger.error(`Error checking low inventory: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new InventorySyncService();
