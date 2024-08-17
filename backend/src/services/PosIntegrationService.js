const axios = require('axios');
const db = require('../models');
const logger = require('../utils/logger');

class PosIntegrationService {
  // Method to sync menus with external POS
  static async syncMenus(locationId, provider) {
    try {
      const menuData = await db.Menu.findAll({
        where: { locationId },
        include: [
          { model: db.MenuGroup, include: [{ model: db.MenuItem }] }
        ],
      });

      const response = await axios.post(`https://api.${provider}.com/sync/menus`, menuData);

      if (response.status === 200) {
        logger.info(`Menu sync successful for provider ${provider} at location ${locationId}`);
      } else {
        logger.error(`Menu sync failed for provider ${provider}: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing menus for provider ${provider}:`, error);
      throw error;
    }
  }

  // Method to sync orders with external POS
  static async syncOrders(locationId, provider) {
    try {
      const orders = await db.Order.findAll({
        where: { locationId, status: 'pending' },
      });

      const response = await axios.post(`https://api.${provider}.com/sync/orders`, orders);

      if (response.status === 200) {
        logger.info(`Order sync successful for provider ${provider} at location ${locationId}`);
      } else {
        logger.error(`Order sync failed for provider ${provider}: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing orders for provider ${provider}:`, error);
      throw error;
    }
  }

  // Method to sync inventory with external POS
  static async syncInventory(locationId, provider) {
    try {
      const inventory = await db.Inventory.findAll({
        where: { locationId },
      });

      const response = await axios.post(`https://api.${provider}.com/sync/inventory`, inventory);

      if (response.status === 200) {
        logger.info(`Inventory sync successful for provider ${provider} at location ${locationId}`);
      } else {
        logger.error(`Inventory sync failed for provider ${provider}: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing inventory for provider ${provider}:`, error);
      throw error;
    }
  }
}

module.exports = PosIntegrationService;
