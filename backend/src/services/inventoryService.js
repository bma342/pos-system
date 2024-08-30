const PosSyncService = require('./posSyncService');
const { Inventory, OnlineInventory } = require('../models');
const logger = require('../services/logger');

class InventoryService {
  // Sync POS inventory and apply the buffer to calculate online inventory
  async syncAndCalculateOnlineInventory(locationId) {
    try {
      // Fetch POS inventory
      const posInventory = await PosSyncService.syncInventory(locationId);

      if (!posInventory.length) {
        logger.warn(`No POS inventory found for location ID ${locationId}`);
        return [];
      }

      // Fetch buffer from the database
      const buffer = await OnlineInventory.findOne({ where: { locationId } });

      // Calculate online inventory
      const onlineInventory = posInventory.map((item) => ({
        itemId: item.id,
        onlineCount: Math.max(item.count - (buffer ? buffer.value : 0), 0),
      }));

      // Save online inventory to the database
      await OnlineInventory.bulkCreate(onlineInventory, { updateOnDuplicate: ['onlineCount'] });

      // Update the POS Inventory after calculating online inventory
      await Inventory.bulkCreate(posInventory, { updateOnDuplicate: ['count'] });

      logger.info(`Online inventory synced and calculated for location ID ${locationId}`);
      return onlineInventory;
    } catch (error) {
      logger.error(`Error syncing and calculating online inventory for location ID ${locationId}: ${error.message}`);
      throw error;
    }
  }

  // Get the online inventory for a location
  async getOnlineInventory(locationId) {
    try {
      const inventory = await OnlineInventory.findAll({ where: { locationId } });

      if (!inventory.length) {
        logger.warn(`No online inventory found for location ID ${locationId}`);
      } else {
        logger.info(`Fetched online inventory for location ID ${locationId}`);
      }

      return inventory;
    } catch (error) {
      logger.error(`Error fetching online inventory for location ID ${locationId}: ${error.message}`);
      throw error;
    }
  }

  // Set the buffer for online inventory
  async setOnlineInventoryBuffer(locationId, buffer) {
    try {
      await OnlineInventory.upsert({ locationId, value: buffer });
      logger.info(`Set online inventory buffer for location ID ${locationId}`);
    } catch (error) {
      logger.error(`Error setting online inventory buffer for location ID ${locationId}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new InventoryService();
