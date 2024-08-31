const { CommissaryKitchen, Inventory } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllCommissaryKitchens = async (clientId) => {
  try {
    return await CommissaryKitchen.findAll({ where: { clientId } });
  } catch (error) {
    logger.error('Error fetching all commissary kitchens:', error);
    throw new AppError('Failed to fetch commissary kitchens', 500);
  }
};

const getCommissaryKitchenById = async (id, clientId) => {
  try {
    const kitchen = await CommissaryKitchen.findOne({ where: { id, clientId } });
    if (!kitchen) {
      throw new AppError('Commissary kitchen not found', 404);
    }
    return kitchen;
  } catch (error) {
    logger.error(`Error fetching commissary kitchen with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch commissary kitchen', 500);
  }
};

const createCommissaryKitchen = async (kitchenData, clientId) => {
  try {
    const newKitchen = await CommissaryKitchen.create({ ...kitchenData, clientId });
    logger.info(`New commissary kitchen created with ID: ${newKitchen.id}`);
    return newKitchen;
  } catch (error) {
    logger.error('Error creating commissary kitchen:', error);
    throw new AppError('Failed to create commissary kitchen', 500);
  }
};

const updateCommissaryKitchen = async (id, kitchenData, clientId) => {
  try {
    const kitchen = await getCommissaryKitchenById(id, clientId);
    const updatedKitchen = await kitchen.update(kitchenData);
    logger.info(`Commissary kitchen updated with ID: ${id}`);
    return updatedKitchen;
  } catch (error) {
    logger.error(`Error updating commissary kitchen with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update commissary kitchen', 500);
  }
};

const deleteCommissaryKitchen = async (id, clientId) => {
  try {
    const kitchen = await getCommissaryKitchenById(id, clientId);
    await kitchen.destroy();
    logger.info(`Commissary kitchen deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting commissary kitchen with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete commissary kitchen', 500);
  }
};

const getCommissaryKitchenInventory = async (kitchenId, clientId) => {
  try {
    await getCommissaryKitchenById(kitchenId, clientId); // Ensure kitchen exists
    const inventory = await Inventory.findAll({ where: { commissaryKitchenId: kitchenId } });
    return inventory;
  } catch (error) {
    logger.error(`Error fetching inventory for commissary kitchen ${kitchenId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch commissary kitchen inventory', 500);
  }
};

const updateCommissaryKitchenInventory = async (kitchenId, inventoryData, clientId) => {
  try {
    await getCommissaryKitchenById(kitchenId, clientId); // Ensure kitchen exists
    const updatedInventory = await Promise.all(
      inventoryData.map(async (item) => {
        const [inventoryItem, created] = await Inventory.findOrCreate({
          where: { commissaryKitchenId: kitchenId, itemId: item.itemId },
          defaults: { ...item, commissaryKitchenId: kitchenId }
        });
        if (!created) {
          await inventoryItem.update(item);
        }
        return inventoryItem;
      })
    );
    logger.info(`Inventory updated for commissary kitchen with ID: ${kitchenId}`);
    return updatedInventory;
  } catch (error) {
    logger.error(`Error updating inventory for commissary kitchen ${kitchenId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update commissary kitchen inventory', 500);
  }
};

module.exports = {
  getAllCommissaryKitchens,
  getCommissaryKitchenById,
  createCommissaryKitchen,
  updateCommissaryKitchen,
  deleteCommissaryKitchen,
  getCommissaryKitchenInventory,
  updateCommissaryKitchenInventory
};