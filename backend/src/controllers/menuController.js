const db = require('../models');
const menuService = require('../services/menuService');
const logger = require('../services/logger');
const syncEngine = require('../services/posSyncService');

// Fetch all menus for a client
exports.getMenus = async (req, res) => {
  try {
    const menus = await menuService.getMenus(req.user.clientId);
    res.status(200).json(menus);
  } catch (error) {
    logger.error(`Error fetching menus for client ID ${req.user.clientId}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching menus', error });
  }
};

// Fetch a single menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await menuService.getMenuById(req.params.id, req.user.clientId);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found or unauthorized access' });
    }
    res.status(200).json(menu);
  } catch (error) {
    logger.error(`Error fetching menu ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching menu', error });
  }
};

// Create a new menu
exports.createMenu = async (req, res) => {
  try {
    const menu = await menuService.createMenu(req.body, req.user.clientId);
    logger.info(`Menu created and synced for client ID ${req.user.clientId}`);
    
    // Trigger POS sync after creation
    await syncEngine.syncMenus(req.body.locationId);
    res.status(201).json(menu);
  } catch (error) {
    logger.error(`Error creating menu: ${error.message}`);
    res.status(500).json({ message: 'Error creating menu', error });
  }
};

// Update an existing menu
exports.updateMenu = async (req, res) => {
  try {
    const menu = await menuService.updateMenu(req.params.id, req.body, req.user.clientId);
    logger.info(`Menu ID ${req.params.id} updated and synced for client ID ${req.user.clientId}`);
    
    // Trigger POS sync after update
    await syncEngine.syncMenus(req.body.locationId);
    res.status(200).json(menu);
  } catch (error) {
    logger.error(`Error updating menu ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ message: 'Error updating menu', error });
  }
};

// Delete a menu
exports.deleteMenu = async (req, res) => {
  try {
    await menuService.deleteMenu(req.params.id, req.user.clientId);
    logger.info(`Menu ID ${req.params.id} deleted and synced for client ID ${req.user.clientId}`);
    
    // Trigger POS sync after deletion
    await syncEngine.syncMenus(req.body.locationId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting menu ID ${req.params.id}: ${error.message}`);
    res.status(500).json({ message: 'Error deleting menu', error });
  }
};

// Add or update a menu item with A/B testing capabilities
exports.upsertMenuItem = async (req, res) => {
  try {
    const menuItem = await menuService.upsertMenuItem(req.body, req.user.clientId);
    
    // Handle A/B test creation if flagged
    if (req.body.isABTest) {
      await menuService.createABTest(req.body, req.user.clientId);
    }
    
    // Trigger POS sync after upsert
    await syncEngine.syncMenuItems(req.body.locationId);
    res.status(200).json(menuItem);
  } catch (error) {
    logger.error(`Error upserting menu item: ${error.message}`);
    res.status(500).json({ message: 'Error adding/updating menu item', error });
  }
};
