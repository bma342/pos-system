const db = require('../models');
const menuService = require('../services/menuService');
const logger = require('../services/logger');
const syncEngine = require('../services/posSyncService');

const getMenus = async (req, res) => {
  try {
    const menus = await menuService.getMenus(req.user.clientId);
    res.status(200).json(menus);
  } catch (error) {
    logger.error(`Error fetching menus for client ID ${req.user.clientId}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching menus', error: error.message });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await menuService.getMenuById(req.params.id, req.user.clientId);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found or unauthorized access' });
    }
    res.status(200).json(menu);
  } catch (error) {
    logger.error(`Error fetching menu ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching menu', error: error.message });
  }
};

const createMenu = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const menu = await menuService.createMenu(req.body, req.user.clientId, transaction);
    await syncEngine.syncMenus(req.body.locationId, transaction);
    await transaction.commit();
    logger.info(`Menu created and synced for client ID ${req.user.clientId}`);
    res.status(201).json(menu);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creating menu: ${error.message}`);
    res.status(500).json({ message: 'Error creating menu', error: error.message });
  }
};

const updateMenu = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const menu = await menuService.updateMenu(req.params.id, req.body, req.user.clientId, transaction);
    await syncEngine.syncMenus(req.body.locationId, transaction);
    await transaction.commit();
    logger.info(`Menu ID ${req.params.id} updated and synced for client ID ${req.user.clientId}`);
    res.status(200).json(menu);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error updating menu ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ message: 'Error updating menu', error: error.message });
  }
};

const deleteMenu = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await menuService.deleteMenu(req.params.id, req.user.clientId, transaction);
    await syncEngine.syncMenus(req.body.locationId, transaction);
    await transaction.commit();
    logger.info(`Menu ID ${req.params.id} deleted and synced for client ID ${req.user.clientId}`);
    res.status(204).send();
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error deleting menu ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ message: 'Error deleting menu', error: error.message });
  }
};

const upsertMenuItem = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const menuItem = await menuService.upsertMenuItem(req.body, req.user.clientId, transaction);

    if (req.body.isABTest) {
      await menuService.createABTest(req.body, req.user.clientId, transaction);
    }

    await syncEngine.syncMenuItems(req.body.locationId, transaction);
    await transaction.commit();
    res.status(200).json(menuItem);
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error upserting menu item: ${error.message}`);
    res.status(500).json({ message: 'Error adding/updating menu item', error: error.message });
  }
};

module.exports = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  upsertMenuItem
};
