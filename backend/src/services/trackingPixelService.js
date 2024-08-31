const { TrackingPixel } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const createPixel = async (pixelData) => {
  try {
    const newPixel = await TrackingPixel.create(pixelData);
    logger.info(`New tracking pixel created with ID: ${newPixel.id}`);
    return newPixel;
  } catch (error) {
    logger.error('Error creating tracking pixel:', error);
    throw new AppError('Failed to create tracking pixel', 500);
  }
};

const getAllPixels = async () => {
  try {
    return await TrackingPixel.findAll();
  } catch (error) {
    logger.error('Error fetching all tracking pixels:', error);
    throw new AppError('Failed to fetch tracking pixels', 500);
  }
};

const getPixelById = async (id) => {
  try {
    const pixel = await TrackingPixel.findByPk(id);
    if (!pixel) {
      throw new AppError('Tracking pixel not found', 404);
    }
    return pixel;
  } catch (error) {
    logger.error(`Error fetching tracking pixel with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch tracking pixel', 500);
  }
};

const updatePixel = async (id, pixelData) => {
  try {
    const pixel = await getPixelById(id);
    const updatedPixel = await pixel.update(pixelData);
    logger.info(`Tracking pixel updated with ID: ${id}`);
    return updatedPixel;
  } catch (error) {
    logger.error(`Error updating tracking pixel with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update tracking pixel', 500);
  }
};

const deletePixel = async (id) => {
  try {
    const pixel = await getPixelById(id);
    await pixel.destroy();
    logger.info(`Tracking pixel deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting tracking pixel with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete tracking pixel', 500);
  }
};

const triggerPixel = async (id) => {
  try {
    const pixel = await getPixelById(id);
    // Implement pixel triggering logic here
    logger.info(`Tracking pixel triggered with ID: ${id}`);
    return { message: 'Tracking pixel triggered successfully' };
  } catch (error) {
    logger.error(`Error triggering tracking pixel with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to trigger tracking pixel', 500);
  }
};

module.exports = {
  createPixel,
  getAllPixels,
  getPixelById,
  updatePixel,
  deletePixel,
  triggerPixel
};