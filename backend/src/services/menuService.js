const db = require('../models');
const logger = require('../services/logger');

class MenuService {
  async getMenus(clientId) {
    try {
      return await db.Menu.findAll({
        where: { clientId },
        include: [{ model: db.MenuGroup, as: 'menuGroups', include: [{ model: db.MenuItem }] }],
      });
    } catch (error) {
      logger.error(`Error fetching menus for Client ID ${clientId}: ${error.message}`);
      throw new Error('Error fetching menus');
    }
  }

  async getMenuById(menuId, clientId) {
    try {
      return await db.Menu.findOne({
        where: { id: menuId, clientId },
        include: [{ model: db.MenuGroup, as: 'menuGroups', include: [{ model: db.MenuItem }] }],
      });
    } catch (error) {
      logger.error(`Error fetching menu ID ${menuId}: ${error.message}`);
      throw new Error('Error fetching menu');
    }
  }

  async createMenu(menuData, clientId) {
    try {
      return await db.Menu.create({
        ...menuData,
        clientId,
      });
    } catch (error) {
      logger.error(`Error creating menu for Client ID ${clientId}: ${error.message}`);
      throw new Error('Error creating menu');
    }
  }

  async updateMenu(menuId, menuData, clientId) {
    try {
      const [updatedMenu] = await db.Menu.update(menuData, {
        where: { id: menuId, clientId },
        returning: true,
      });

      if (!updatedMenu) {
        throw new Error('Menu not found or unauthorized access');
      }

      return updatedMenu;
    } catch (error) {
      logger.error(`Error updating menu ID ${menuId}: ${error.message}`);
      throw new Error('Error updating menu');
    }
  }

  async deleteMenu(menuId, clientId) {
    try {
      const menu = await db.Menu.findOne({ where: { id: menuId, clientId } });
      if (!menu) throw new Error('Menu not found or unauthorized access');

      await db.Menu.destroy({ where: { id: menuId, clientId } });
      logger.info(`Menu ID ${menuId} deleted successfully`);
    } catch (error) {
      logger.error(`Error deleting menu ID ${menuId}: ${error.message}`);
      throw new Error('Error deleting menu');
    }
  }

  async upsertMenuItem(menuItemData, clientId) {
    try {
      return await db.MenuItem.upsert({
        ...menuItemData,
        clientId,
      });
    } catch (error) {
      logger.error(`Error upserting menu item for Client ID ${clientId}: ${error.message}`);
      throw new Error('Error upserting menu item');
    }
  }

  async createABTest(abTestData, clientId) {
    try {
      return await db.ABTest.create({
        ...abTestData,
        clientId,
      });
    } catch (error) {
      logger.error(`Error creating A/B test for Client ID ${clientId}: ${error.message}`);
      throw new Error('Error creating A/B test');
    }
  }
}

module.exports = new MenuService();

