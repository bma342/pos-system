const { DeliveryDriver, Order } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllDeliveryDrivers = async (clientId) => {
  try {
    return await DeliveryDriver.findAll({ where: { clientId } });
  } catch (error) {
    logger.error('Error fetching all delivery drivers:', error);
    throw new AppError('Failed to fetch delivery drivers', 500);
  }
};

const getDeliveryDriverById = async (id, clientId) => {
  try {
    const driver = await DeliveryDriver.findOne({ where: { id, clientId } });
    if (!driver) {
      throw new AppError('Delivery driver not found', 404);
    }
    return driver;
  } catch (error) {
    logger.error(`Error fetching delivery driver with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch delivery driver', 500);
  }
};

const createDeliveryDriver = async (driverData, clientId) => {
  try {
    const newDriver = await DeliveryDriver.create({ ...driverData, clientId });
    logger.info(`New delivery driver created with ID: ${newDriver.id}`);
    return newDriver;
  } catch (error) {
    logger.error('Error creating delivery driver:', error);
    throw new AppError('Failed to create delivery driver', 500);
  }
};

const updateDeliveryDriver = async (id, driverData, clientId) => {
  try {
    const driver = await getDeliveryDriverById(id, clientId);
    const updatedDriver = await driver.update(driverData);
    logger.info(`Delivery driver updated with ID: ${id}`);
    return updatedDriver;
  } catch (error) {
    logger.error(`Error updating delivery driver with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update delivery driver', 500);
  }
};

const deleteDeliveryDriver = async (id, clientId) => {
  try {
    const driver = await getDeliveryDriverById(id, clientId);
    await driver.destroy();
    logger.info(`Delivery driver deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting delivery driver with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete delivery driver', 500);
  }
};

const getActiveDeliveries = async (driverId, clientId) => {
  try {
    await getDeliveryDriverById(driverId, clientId); // Ensure driver exists
    const activeDeliveries = await Order.findAll({
      where: { driverId, status: 'in_progress', clientId }
    });
    return activeDeliveries;
  } catch (error) {
    logger.error(`Error fetching active deliveries for driver ${driverId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch active deliveries', 500);
  }
};

const updateDeliveryStatus = async (driverId, deliveryId, status, clientId) => {
  try {
    await getDeliveryDriverById(driverId, clientId); // Ensure driver exists
    const delivery = await Order.findOne({ where: { id: deliveryId, driverId, clientId } });
    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }
    const updatedDelivery = await delivery.update({ status });
    logger.info(`Delivery status updated for delivery ID: ${deliveryId}`);
    return updatedDelivery;
  } catch (error) {
    logger.error(`Error updating delivery status for delivery ${deliveryId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update delivery status', 500);
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