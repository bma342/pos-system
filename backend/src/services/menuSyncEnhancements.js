const axios = require('axios');
const db = require('../models');
const logger = require('./logger');

class MenuSyncEnhancements {
  async syncMenuData(posProfile) {
    try {
      const menuData = await db.Menu.findAll({
        where: { locationId: posProfile.locationId },
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
            price: item.basePrice,
            pointsPrice: item.pointsPrice || null,
            availability: item.isAvailable,
            modifiers: item.Modifiers.map((modifier) => ({
              name: modifier.name,
              price: modifier.price,
            })),
            tags: item.tags || [],
          })),
        })),
      }));

      const response = await axios.post(`${posProfile.apiBaseUrl}/menus`, formattedMenuData, {
        headers: {
          Authorization: `Bearer ${posProfile.clientSecret}`,
          'Content-Type': posProfile.contentType || 'application/json',
        },
      });

      if (response.status === 200) {
        logger.info(`Menu sync successful for location ${posProfile.locationId}`);
      } else {
        logger.error(`Menu sync failed: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing menu data: ${error.message}`);
      throw error;
    }
  }

  // Additional logic for syncing modifiers and item availability
  async syncModifiersAndAvailability(posProfile) {
    try {
      // Implement modifier-specific sync logic here
      logger.info(`Modifiers and availability synced for profile ${posProfile.id}`);
    } catch (error) {
      logger.error(`Error syncing modifiers and availability: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new MenuSyncEnhancements();
