const inventoryService = require('../services/inventoryService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getInventory = async (req, res, next) => {
  try {
    const inventory = await inventoryService.getInventoryItems();
    res.json(inventory);
  } catch (error) {
    logger.error('Error fetching inventory:', error);
    next(new AppError('Error fetching inventory', 500));
  }
};

const getInventoryItemById = async (req, res, next) => {
  try {
    const item = await inventoryService.getInventoryItemById(req.params.id);
    if (!item) {
      return next(new AppError('Inventory item not found', 404));
    }
    res.json(item);
  } catch (error) {
    logger.error(`Error fetching inventory item ${req.params.id}:`, error);
    next(new AppError('Error fetching inventory item', 500));
  }
};

const addInventoryItem = async (req, res, next) => {
  try {
    const newItem = await inventoryService.createInventoryItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    logger.error('Error adding inventory item:', error);
    next(new AppError('Error adding inventory item', 500));
  }
};

const updateInventory = async (req, res, next) => {
  try {
    const updatedItem = await inventoryService.updateInventoryItem(req.params.id, req.body);
    res.json(updatedItem);
  } catch (error) {
    logger.error(`Error updating inventory item ${req.params.id}:`, error);
    next(new AppError('Error updating inventory item', 500));
  }
};

const removeInventoryItem = async (req, res, next) => {
  try {
    await inventoryService.deleteInventoryItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error removing inventory item ${req.params.id}:`, error);
    next(new AppError('Error removing inventory item', 500));
  }
};

const updateInventoryQuantity = async (req, res, next) => {
  try {
    const updatedItem = await inventoryService.updateInventoryQuantity(req.params.id, req.body.quantity);
    res.json(updatedItem);
  } catch (error) {
    logger.error(`Error updating inventory quantity for item ${req.params.id}:`, error);
    next(new AppError('Error updating inventory quantity', 500));
  }
};

module.exports = {
  getInventory,
  getInventoryItemById,
  addInventoryItem,
  updateInventory,
  removeInventoryItem,
  updateInventoryQuantity
};