const { InventoryItem } = require('../models');
const { AppError } = require('../utils/errorHandler');

const getInventoryItems = async () => {
  return await InventoryItem.findAll();
};

const getInventoryItemById = async (id) => {
  const item = await InventoryItem.findByPk(id);
  if (!item) {
    throw new AppError('Inventory item not found', 404);
  }
  return item;
};

const createInventoryItem = async (itemData) => {
  return await InventoryItem.create(itemData);
};

const updateInventoryItem = async (id, itemData) => {
  const item = await getInventoryItemById(id);
  return await item.update(itemData);
};

const deleteInventoryItem = async (id) => {
  const item = await getInventoryItemById(id);
  await item.destroy();
};

const updateInventoryQuantity = async (id, quantity) => {
  const item = await getInventoryItemById(id);
  item.quantity += quantity;
  if (item.quantity < 0) {
    throw new AppError('Insufficient inventory', 400);
  }
  return await item.save();
};

module.exports = {
  getInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateInventoryQuantity
};