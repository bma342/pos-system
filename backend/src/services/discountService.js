const { Discount } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllDiscounts = async (clientId) => {
  try {
    return await Discount.findAll({ where: { clientId } });
  } catch (error) {
    logger.error('Error fetching all discounts:', error);
    throw new AppError('Failed to fetch discounts', 500);
  }
};

const getDiscountById = async (id, clientId) => {
  try {
    const discount = await Discount.findOne({ where: { id, clientId } });
    if (!discount) {
      throw new AppError('Discount not found', 404);
    }
    return discount;
  } catch (error) {
    logger.error(`Error fetching discount with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch discount', 500);
  }
};

const createDiscount = async (discountData, clientId) => {
  try {
    const newDiscount = await Discount.create({ ...discountData, clientId });
    logger.info(`New discount created with ID: ${newDiscount.id}`);
    return newDiscount;
  } catch (error) {
    logger.error('Error creating discount:', error);
    throw new AppError('Failed to create discount', 500);
  }
};

const updateDiscount = async (id, discountData, clientId) => {
  try {
    const discount = await getDiscountById(id, clientId);
    const updatedDiscount = await discount.update(discountData);
    logger.info(`Discount updated with ID: ${id}`);
    return updatedDiscount;
  } catch (error) {
    logger.error(`Error updating discount with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update discount', 500);
  }
};

const deleteDiscount = async (id, clientId) => {
  try {
    const discount = await getDiscountById(id, clientId);
    await discount.destroy();
    logger.info(`Discount deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting discount with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete discount', 500);
  }
};

const getDiscountsByLocation = async (locationId, clientId) => {
  try {
    return await Discount.findAll({ where: { locationId, clientId } });
  } catch (error) {
    logger.error(`Error fetching discounts for location ${locationId}:`, error);
    throw new AppError('Failed to fetch discounts for location', 500);
  }
};

module.exports = {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountsByLocation
};