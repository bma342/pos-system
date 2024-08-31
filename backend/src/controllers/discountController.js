const discountService = require('../services/discountService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllDiscounts = async (req, res, next) => {
  try {
    const discounts = await discountService.getAllDiscounts(req.user.clientId);
    res.status(200).json(discounts);
  } catch (error) {
    logger.error('Error fetching discounts:', error);
    next(new AppError('Error fetching discounts', 500));
  }
};

const getDiscountById = async (req, res, next) => {
  try {
    const discount = await discountService.getDiscountById(req.params.id, req.user.clientId);
    if (!discount) {
      return next(new AppError('Discount not found', 404));
    }
    res.status(200).json(discount);
  } catch (error) {
    logger.error(`Error fetching discount ${req.params.id}:`, error);
    next(error);
  }
};

const createDiscount = async (req, res, next) => {
  try {
    const { name, type, value, conditions, locationId, isGlobal, maxUsesPerGuest } = req.body;

    if (!name || !type || !value) {
      return next(new AppError('Name, type, and value are required fields.', 422));
    }

    const newDiscount = await discountService.createDiscount({
      name,
      type,
      value,
      conditions,
      locationId,
      isGlobal,
      maxUsesPerGuest,
      status: 'active',
      clientId: req.user.clientId
    });

    logger.info(`Discount ${newDiscount.name} created by User ${req.user.id} at IP ${req.ip}`);
    res.status(201).json(newDiscount);
  } catch (error) {
    logger.error(`Error creating discount: ${error.message}`, { userId: req.user.id, ip: req.ip });
    next(new AppError('Failed to create discount', 500));
  }
};

const updateDiscount = async (req, res, next) => {
  try {
    const updatedDiscount = await discountService.updateDiscount(req.params.id, req.body, req.user.clientId);
    if (!updatedDiscount) {
      return next(new AppError('Discount not found', 404));
    }
    res.status(200).json(updatedDiscount);
  } catch (error) {
    logger.error(`Error updating discount ${req.params.id}:`, error);
    next(error);
  }
};

const deleteDiscount = async (req, res, next) => {
  try {
    const result = await discountService.deleteDiscount(req.params.id, req.user.clientId);
    if (!result) {
      return next(new AppError('Discount not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting discount ${req.params.id}:`, error);
    next(error);
  }
};

const getDiscountsByLocation = async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const discounts = await discountService.getDiscountsByLocation(locationId, req.user.clientId);
    logger.info(`Discounts retrieved by User ${req.user.id} for Location ${locationId}`);
    res.status(200).json(discounts);
  } catch (error) {
    logger.error(`Error retrieving discounts for Location ${req.params.locationId}: ${error.message}`, { userId: req.user.id, ip: req.ip });
    next(new AppError('Failed to retrieve discounts', 500));
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
