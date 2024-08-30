const { DeliveryDriver } = require('../models');
const logger = require('../services/logger');

exports.getAllDeliveryDrivers = async (req, res) => {
  try {
    const drivers = await DeliveryDriver.findAll();
    res.status(200).json(drivers);
  } catch (error) {
    logger.error(`Error fetching delivery drivers: ${error.message}`);
    res.status(500).json({ message: 'Error fetching delivery drivers', error });
  }
};

exports.getDeliveryDriverById = async (req, res) => {
  try {
    const driver = await DeliveryDriver.findByPk(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Delivery driver not found' });
    res.status(200).json(driver);
  } catch (error) {
    logger.error(`Error fetching delivery driver by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching delivery driver', error });
  }
};

exports.createDeliveryDriver = async (req, res) => {
  try {
    const newDriver = await DeliveryDriver.create(req.body);
    logger.info(`Delivery driver created: ${newDriver.id}`);
    res.status(201).json(newDriver);
  } catch (error) {
    logger.error(`Error creating delivery driver: ${error.message}`);
    res.status(500).json({ message: 'Error creating delivery driver', error });
  }
};

exports.updateDeliveryDriver = async (req, res) => {
  try {
    const [updated] = await DeliveryDriver.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Delivery driver not found' });

    const updatedDriver = await DeliveryDriver.findByPk(req.params.id);
    logger.info(`Delivery driver updated: ${req.params.id}`);
    res.status(200).json(updatedDriver);
  } catch (error) {
    logger.error(`Error updating delivery driver: ${error.message}`);
    res.status(500).json({ message: 'Error updating delivery driver', error });
  }
};

exports.deleteDeliveryDriver = async (req, res) => {
  try {
    const deleted = await DeliveryDriver.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Delivery driver not found' });

    logger.info(`Delivery driver deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting delivery driver: ${error.message}`);
    res.status(500).json({ message: 'Error deleting delivery driver', error });
  }
};
