const commissaryKitchenService = require('../services/commissaryKitchenService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllCommissaryKitchens = async (req, res, next) => {
  try {
    const kitchens = await commissaryKitchenService.getAllCommissaryKitchens(req.user.clientId);
    res.status(200).json(kitchens);
  } catch (error) {
    logger.error('Error fetching commissary kitchens:', error);
    next(new AppError('Error fetching commissary kitchens', 500));
  }
};

const getCommissaryKitchenById = async (req, res, next) => {
  try {
    const kitchen = await commissaryKitchenService.getCommissaryKitchenById(req.params.id, req.user.clientId);
    if (!kitchen) {
      return next(new AppError('Commissary kitchen not found', 404));
    }
    res.status(200).json(kitchen);
  } catch (error) {
    logger.error(`Error fetching commissary kitchen ${req.params.id}:`, error);
    next(error);
  }
};

const createCommissaryKitchen = async (req, res, next) => {
  try {
    const newKitchen = await commissaryKitchenService.createCommissaryKitchen(req.body, req.user.clientId);
    res.status(201).json(newKitchen);
  } catch (error) {
    logger.error('Error creating commissary kitchen:', error);
    next(error);
  }
};

const updateCommissaryKitchen = async (req, res, next) => {
  try {
    const updatedKitchen = await commissaryKitchenService.updateCommissaryKitchen(req.params.id, req.body, req.user.clientId);
    if (!updatedKitchen) {
      return next(new AppError('Commissary kitchen not found', 404));
    }
    res.status(200).json(updatedKitchen);
  } catch (error) {
    logger.error(`Error updating commissary kitchen ${req.params.id}:`, error);
    next(error);
  }
};

const deleteCommissaryKitchen = async (req, res, next) => {
  try {
    const result = await commissaryKitchenService.deleteCommissaryKitchen(req.params.id, req.user.clientId);
    if (!result) {
      return next(new AppError('Commissary kitchen not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting commissary kitchen ${req.params.id}:`, error);
    next(error);
  }
};

const getCommissaryKitchenInventory = async (req, res, next) => {
  try {
    const inventory = await commissaryKitchenService.getCommissaryKitchenInventory(req.params.id, req.user.clientId);
    res.status(200).json(inventory);
  } catch (error) {
    logger.error(`Error fetching inventory for commissary kitchen ${req.params.id}:`, error);
    next(error);
  }
};

const updateCommissaryKitchenInventory = async (req, res, next) => {
  try {
    const updatedInventory = await commissaryKitchenService.updateCommissaryKitchenInventory(req.params.id, req.body, req.user.clientId);
    res.status(200).json(updatedInventory);
  } catch (error) {
    logger.error(`Error updating inventory for commissary kitchen ${req.params.id}:`, error);
    next(error);
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
