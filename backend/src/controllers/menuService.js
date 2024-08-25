const db = require('../models');
const logger = require('../services/logger');

class MenuService {
  async getMenusByLocation(locationId) {
    try {
      const menus = await db.Menu.findAll({
        where: { locationId },
        include: [
          { model: db.MenuGroup, include: [{ model: db.MenuItem }] },
        ],
      });

      return menus;
    } catch (error) {
      logger.error(`Error fetching menus for location ${locationId}:`, error);
      throw error;
    }
  }

  async updateMenu(menuId, menuData) {
    try {
      const updatedMenu = await db.Menu.update(menuData, {
        where: { id: menuId },
        returning: true,
        plain: true,
      });

      return updatedMenu[1]; // Returning the updated instance
    } catch (error) {
      logger.error(`Error updating menu with ID ${menuId}:`, error);
      throw error;
    }
  }

  async deleteMenu(menuId) {
    try {
      await db.Menu.destroy({
        where: { id: menuId },
      });

      logger.info(`Menu with ID ${menuId} deleted successfully`);
    } catch (error) {
      logger.error(`Error deleting menu with ID ${menuId}:`, error);
      throw error;
    }
  }

  async syncMenuWithProvider(locationId, provider) {
    try {
      const menus = await this.getMenusByLocation(locationId);

      // Assuming PosSyncService handles sending menus to the provider
      const PosSyncService = require('./posSyncService');
      await PosSyncService.syncMenus({ menus, provider });

      logger.info(`Menus synced with provider ${provider} for location ${locationId}`);
    } catch (error) {
      logger.error(`Error syncing menus for location ${locationId} with provider ${provider}:`, error);
      throw error;
    }
  }
}

module.exports = new MenuService();
