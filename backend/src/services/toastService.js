const axios = require('axios');
const logger = require('../utils/logger');
const db = require('../models');

class ToastService {
  async authenticate(clientId, clientSecret) {
    try {
      const response = await axios.post('https://api.toasttab.com/authentication/v1/authentication/login', {
        clientId,
        clientSecret,
        userAccessType: 'TOAST_MACHINE_CLIENT',
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data;
    } catch (error) {
      logger.error('Error during Toast authentication:', error);
      throw error;
    }
  }

  async getMenu(token, restaurantId) {
    try {
      const response = await axios.get(`https://api.toasttab.com/menus/v3/menus`, {
        headers: {
          'Toast-Restaurant-External-ID': restaurantId,
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      return data.map(menu => ({
        ...menu,
        groups: menu.groups.map(group => ({
          ...group,
          imageUrl: group.images?.[0]?.url || null,
          items: group.items.map(item => ({
            ...item,
            imageUrl: item.images?.[0]?.url || null,
          })),
        })),
      }));
    } catch (error) {
      logger.error('Error fetching menu from Toast:', error);
      throw error;
    }
  }

  async handleMenusUpdated(payload) {
    try {
      const { restaurantGuid, publishedDate } = payload;
      const menuData = await this.getMenu(restaurantGuid); // Fetch menu data

      // Log the received menu data for debugging
      logger.info(`Received menu data: ${JSON.stringify(menuData)}`);

      // Process and store the menu data in the database
      await db.Menu.update({ updatedAt: publishedDate }, {
        where: { restaurantGuid },
      });

      // Additional processing or storage logic for menuData can be added here
      logger.info(`Successfully updated menu for restaurant ${restaurantGuid}`);
    } catch (error) {
      logger.error(`Error handling menus_updated webhook:`, error);
      throw error;
    }
  }
}

module.exports = new ToastService();
