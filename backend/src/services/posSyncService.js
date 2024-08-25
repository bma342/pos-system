const axios = require('axios');
const db = require('../models');
const logger = require('./logger');
const { applyRoundingIfNeeded } = require('../utils/pricingUtils');

class PosSyncService {
  async syncMenus(locationPosProfile, corePosProfile) {
    try {
      const menuData = await db.Menu.findAll({
        where: { locationId: locationPosProfile.locationId },
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
            price: applyRoundingIfNeeded(item.basePrice, locationPosProfile.roundingOption),
            pointsPrice: item.pointsPrice || null,
            modifiers: item.Modifiers.map((modifier) => ({
              name: modifier.name,
              price: applyRoundingIfNeeded(modifier.price, locationPosProfile.roundingOption),
            })),
          })),
        })),
      }));

      const response = await axios.post(`${corePosProfile.defaultAPISettings.apiBaseUrl}/menus`, formattedMenuData, {
        headers: {
          Authorization: `Bearer ${corePosProfile.defaultAPISettings.apiKey}`,
          'Content-Type': corePosProfile.defaultAPISettings.contentType || 'application/json',
        },
      });

      if (response.status === 200) {
        logger.info(`Menu sync successful for location ${locationPosProfile.locationId}`);
      } else {
        logger.error(`Menu sync failed: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing menus: ${error.message}`);
      throw error;
    }
  }

  async syncOrders(locationPosProfile, corePosProfile, orderData) {
    try {
      const deconstructedOrder = orderData.items.map((item) => {
        const originalPrice = item.upliftedPrice / (1 + locationPosProfile.flatUpliftPercentage / 100);
        return {
          ...item,
          originalPrice,
          uplift: item.upliftedPrice - originalPrice,
        };
      });

      const orderWithServiceFee = {
        ...orderData,
        serviceFees: deconstructedOrder.reduce((total, item) => total + item.uplift, 0),
        items: deconstructedOrder.map((item) => ({
          ...item,
          price: item.originalPrice,
        })),
      };

      const response = await axios.post(`${corePosProfile.defaultAPISettings.apiBaseUrl}/orders`, orderWithServiceFee, {
        headers: {
          Authorization: `Bearer ${corePosProfile.defaultAPISettings.apiKey}`,
          'Content-Type': corePosProfile.defaultAPISettings.contentType || 'application/json',
        },
      });

      if (response.status === 200) {
        logger.info(`Order sync successful for location ${locationPosProfile.locationId}`);
      } else {
        logger.error(`Order sync failed: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing orders: ${error.message}`);
      throw error;
    }
  }

  async syncInventory(locationPosProfile, corePosProfile) {
    try {
      const inventory = await db.Inventory.findAll({
        where: { locationId: locationPosProfile.locationId },
        attributes: ['itemName', 'quantity', 'sku'],
      });

      const formattedInventory = inventory.map((item) => ({
        itemName: item.itemName,
        quantity: item.quantity,
        sku: item.sku,
      }));

      const response = await axios.post(`${corePosProfile.defaultAPISettings.apiBaseUrl}/inventory`, formattedInventory, {
        headers: {
          Authorization: `Bearer ${corePosProfile.defaultAPISettings.apiKey}`,
          'Content-Type': corePosProfile.defaultAPISettings.contentType || 'application/json',
        },
      });

      if (response.status === 200) {
        logger.info(`Inventory sync successful for location ${locationPosProfile.locationId}`);
      } else {
        logger.error(`Inventory sync failed: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing inventory: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new PosSyncService();
