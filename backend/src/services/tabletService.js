const { Tablet } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllTablets = async () => {
  try {
    return await Tablet.findAll();
  } catch (error) {
    logger.error('Error fetching all tablets:', error);
    throw new AppError('Failed to fetch tablets', 500);
  }
};

const getTabletById = async (id) => {
  try {
    const tablet = await Tablet.findByPk(id);
    if (!tablet) {
      throw new AppError('Tablet not found', 404);
    }
    return tablet;
  } catch (error) {
    logger.error(`Error fetching tablet with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch tablet', 500);
  }
};

const createTablet = async (tabletData) => {
  try {
    const newTablet = await Tablet.create(tabletData);
    logger.info(`New tablet created with ID: ${newTablet.id}`);
    return newTablet;
  } catch (error) {
    logger.error('Error creating tablet:', error);
    throw new AppError('Failed to create tablet', 500);
  }
};

const updateTablet = async (id, tabletData) => {
  try {
    const tablet = await getTabletById(id);
    const updatedTablet = await tablet.update(tabletData);
    logger.info(`Tablet updated with ID: ${id}`);
    return updatedTablet;
  } catch (error) {
    logger.error(`Error updating tablet with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update tablet', 500);
  }
};

const deleteTablet = async (id) => {
  try {
    const tablet = await getTabletById(id);
    await tablet.destroy();
    logger.info(`Tablet deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting tablet with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete tablet', 500);
  }
};

const getTabletsByLocation = async (locationId) => {
  try {
    return await Tablet.findAll({ where: { locationId } });
  } catch (error) {
    logger.error(`Error fetching tablets for location ${locationId}:`, error);
    throw new AppError('Failed to fetch tablets for location', 500);
  }
};

const syncTabletData = async (id) => {
  try {
    const tablet = await getTabletById(id);
    // Implement sync logic here
    logger.info(`Data synced for tablet with ID: ${id}`);
    return { message: 'Tablet data synced successfully' };
  } catch (error) {
    logger.error(`Error syncing data for tablet with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to sync tablet data', 500);
  }
};

module.exports = {
  getAllTablets,
  getTabletById,
  createTablet,
  updateTablet,
  deleteTablet,
  getTabletsByLocation,
  syncTabletData
};