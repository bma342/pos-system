const deliveryDriverService = require('../services/deliveryDriverService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllDeliveryDrivers = async (req, res, next) => {
  try {
    const drivers = await deliveryDriverService.getAllDeliveryDrivers(req.user.clientId);
    res.status(200).json(drivers);
  } catch (error) {
    logger.error('Error fetching delivery drivers:', error);
    next(new AppError('Error fetching delivery drivers', 500));
  }
};

const getDeliveryDriverById = async (req, res, next) => {
  try {
    const driver = await deliveryDriverService.getDeliveryDriverById(req.params.id, req.user.clientId);
    if (!driver) {
      return next(new AppError('Delivery driver not found', 404));
    }
    res.status(200).json(driver);
  } catch (error) {
    logger.error(`Error fetching delivery driver ${req.params.id}:`, error);
    next(error);
  }
};

const createDeliveryDriver = async (req, res, next) => {
  try {
    const newDriver = await deliveryDriverService.createDeliveryDriver(req.body, req.user.clientId);
    res.status(201).json(newDriver);
  } catch (error) {
    logger.error('Error creating delivery driver:', error);
    next(error);
  }
};

const updateDeliveryDriver = async (req, res, next) => {
  try {
    const updatedDriver = await deliveryDriverService.updateDeliveryDriver(req.params.id, req.body, req.user.clientId);
    if (!updatedDriver) {
      return next(new AppError('Delivery driver not found', 404));
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    logger.error(`Error updating delivery driver ${req.params.id}:`, error);
    next(error);
  }
};

const deleteDeliveryDriver = async (req, res, next) => {
  try {
    const result = await deliveryDriverService.deleteDeliveryDriver(req.params.id, req.user.clientId);
    if (!result) {
      return next(new AppError('Delivery driver not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting delivery driver ${req.params.id}:`, error);
    next(error);
  }
};

const getActiveDeliveries = async (req, res, next) => {
  try {
    const activeDeliveries = await deliveryDriverService.getActiveDeliveries(req.params.id, req.user.clientId);
    res.status(200).json(activeDeliveries);
  } catch (error) {
    logger.error(`Error fetching active deliveries for driver ${req.params.id}:`, error);
    next(error);
  }
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const updatedDelivery = await deliveryDriverService.updateDeliveryStatus(req.params.id, req.params.deliveryId, req.body.status, req.user.clientId);
    if (!updatedDelivery) {
      return next(new AppError('Delivery not found', 404));
    }
    res.status(200).json(updatedDelivery);
  } catch (error) {
    logger.error(`Error updating delivery status for delivery ${req.params.deliveryId}:`, error);
    next(error);
  }
};

module.exports = {
  getAllDeliveryDrivers,
  getDeliveryDriverById,
  createDeliveryDriver,
  updateDeliveryDriver,
  deleteDeliveryDriver,
  getActiveDeliveries,
  updateDeliveryStatus
};
