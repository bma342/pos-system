const db = require('../models');
const axios = require('axios');
const logger = require('./logger');
const { applyRoundingIfNeeded } = require('../utils/pricingUtils');

class PosSyncService {
  async syncMenus(locationProfile, coreProfile) {
    try {
      const menuData = await db.Menu.findAll({
        where: { locationId: locationProfile.locationId },
        include: [
          { model: db.MenuGroup, include: [{ model: db.MenuItem, include: [db.Modifier] }] },
        ],
      });

      const formattedMenuData = menuData.map((menu) => ({
        name: menu.name,
        groups: menu.MenuGroups.map((group) => ({
          name: group.name,
          items: group.MenuItems.map((item) => ({
            name: item.name,
            price: applyRoundingIfNeeded(item.basePrice, locationProfile.roundingOption),
            modifiers: item.Modifiers.map((modifier) => ({
              name: modifier.name,
              price: applyRoundingIfNeeded(modifier.price, locationProfile.roundingOption),
            })),
          })),
        })),
      }));

      const response = await axios.post(`${coreProfile.apiBaseUrl}/menus`, formattedMenuData, {
        headers: {
          Authorization: `Bearer ${coreProfile.clientSecret}`,
          'Content-Type': coreProfile.contentType || 'application/json',
        },
      });

      if (response.status === 200) {
        logger.info(`Menu sync successful for location ${locationProfile.locationId}`);
      } else {
        logger.error(`Menu sync failed: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing menus: ${error.message}`);
      throw error;
    }
  }

  async syncInventory(locationProfile, coreProfile) {
    try {
      const inventory = await db.Inventory.findAll({
        where: { locationId: locationProfile.locationId },
        attributes: ['itemName', 'quantity', 'sku'],
      });

      const formattedInventory = inventory.map((item) => ({
        itemName: item.itemName,
        quantity: item.quantity,
        sku: item.sku,
      }));

      const response = await axios.post(`${coreProfile.apiBaseUrl}/inventory`, formattedInventory, {
        headers: {
          Authorization: `Bearer ${coreProfile.clientSecret}`,
          'Content-Type': coreProfile.contentType || 'application/json',
        },
      });

      if (response.status === 200) {
        logger.info(`Inventory sync successful for location ${locationProfile.locationId}`);
      } else {
        logger.error(`Inventory sync failed: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing inventory: ${error.message}`);
      throw error;
    }
  }

  // Additional logic for syncing orders, etc.
}

module.exports = new PosSyncService();
