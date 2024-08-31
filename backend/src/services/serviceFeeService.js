const { ServiceFee } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllServiceFees = async () => {
  try {
    return await ServiceFee.findAll();
  } catch (error) {
    logger.error('Error fetching all service fees:', error);
    throw new AppError('Failed to fetch service fees', 500);
  }
};

const getServiceFeeById = async (id) => {
  try {
    const serviceFee = await ServiceFee.findByPk(id);
    if (!serviceFee) {
      throw new AppError('Service fee not found', 404);
    }
    return serviceFee;
  } catch (error) {
    logger.error(`Error fetching service fee with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch service fee', 500);
  }
};

const createServiceFee = async (serviceFeeData) => {
  try {
    const newServiceFee = await ServiceFee.create(serviceFeeData);
    logger.info(`New service fee created with ID: ${newServiceFee.id}`);
    return newServiceFee;
  } catch (error) {
    logger.error('Error creating service fee:', error);
    throw new AppError('Failed to create service fee', 500);
  }
};

const updateServiceFee = async (id, serviceFeeData) => {
  try {
    const serviceFee = await ServiceFee.findByPk(id);
    if (!serviceFee) {
      throw new AppError('Service fee not found', 404);
    }
    const updatedServiceFee = await serviceFee.update(serviceFeeData);
    logger.info(`Service fee updated with ID: ${id}`);
    return updatedServiceFee;
  } catch (error) {
    logger.error(`Error updating service fee with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update service fee', 500);
  }
};

const deleteServiceFee = async (id) => {
  try {
    const serviceFee = await ServiceFee.findByPk(id);
    if (!serviceFee) {
      throw new AppError('Service fee not found', 404);
    }
    await serviceFee.destroy();
    logger.info(`Service fee deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting service fee with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete service fee', 500);
  }
};

const getServiceFeesByClient = async (clientId) => {
  try {
    return await ServiceFee.findAll({ where: { clientId } });
  } catch (error) {
    logger.error(`Error fetching service fees for client ${clientId}:`, error);
    throw new AppError('Failed to fetch service fees for client', 500);
  }
};

module.exports = {
  getAllServiceFees,
  getServiceFeeById,
  createServiceFee,
  updateServiceFee,
  deleteServiceFee,
  getServiceFeesByClient
};