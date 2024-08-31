const serviceFeeService = require('../services/serviceFeeService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// Get all service fees
exports.getAllServiceFees = async (req, res, next) => {
  try {
    const serviceFees = await serviceFeeService.getAllServiceFees();
    res.status(200).json(serviceFees);
  } catch (error) {
    logger.error('Error fetching all service fees:', error);
    next(new AppError('Failed to fetch service fees', 500));
  }
};

// Get a single service fee by ID
exports.getServiceFeeById = async (req, res, next) => {
  try {
    const serviceFee = await serviceFeeService.getServiceFeeById(req.params.id);
    if (!serviceFee) {
      return next(new AppError('Service fee not found', 404));
    }
    res.status(200).json(serviceFee);
  } catch (error) {
    logger.error(`Error fetching service fee ${req.params.id}:`, error);
    next(error);
  }
};

// Create a new service fee
exports.createServiceFee = async (req, res, next) => {
  try {
    const newServiceFee = await serviceFeeService.createServiceFee(req.body);
    res.status(201).json(newServiceFee);
  } catch (error) {
    logger.error('Error creating service fee:', error);
    next(new AppError('Failed to create service fee', 500));
  }
};

// Update an existing service fee
exports.updateServiceFee = async (req, res, next) => {
  try {
    const updatedServiceFee = await serviceFeeService.updateServiceFee(req.params.id, req.body);
    if (!updatedServiceFee) {
      return next(new AppError('Service fee not found', 404));
    }
    res.status(200).json(updatedServiceFee);
  } catch (error) {
    logger.error(`Error updating service fee ${req.params.id}:`, error);
    next(error);
  }
};

// Delete a service fee
exports.deleteServiceFee = async (req, res, next) => {
  try {
    const result = await serviceFeeService.deleteServiceFee(req.params.id);
    if (!result) {
      return next(new AppError('Service fee not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting service fee ${req.params.id}:`, error);
    next(error);
  }
};

// Get service fees by client
exports.getServiceFeesByClient = async (req, res, next) => {
  try {
    const serviceFees = await serviceFeeService.getServiceFeesByClient(req.params.clientId);
    res.status(200).json(serviceFees);
  } catch (error) {
    logger.error(`Error fetching service fees for client ${req.params.clientId}:`, error);
    next(error);
  }
};
