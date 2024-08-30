const { ServiceFee } = require('../models');
const logger = require('../services/logger');

// Get all service fees
exports.getAllServiceFees = async (req, res) => {
  try {
    const serviceFees = await ServiceFee.findAll();
    res.json(serviceFees);
  } catch (error) {
    logger.error(`Error fetching service fees: ${error.message}`);
    res.status(500).json({ message: 'Error fetching service fees', error: error.message });
  }
};

// Get a single service fee by ID
exports.getServiceFeeById = async (req, res) => {
  try {
    const serviceFee = await ServiceFee.findByPk(req.params.id);
    if (!serviceFee) {
      return res.status(404).json({ message: 'Service fee not found' });
    }
    res.json(serviceFee);
  } catch (error) {
    logger.error(`Error fetching service fee: ${error.message}`);
    res.status(500).json({ message: 'Error fetching service fee', error: error.message });
  }
};

// Create a new service fee
exports.createServiceFee = async (req, res) => {
  try {
    const { locationId, providerId, orderType, feeAmount, posSyncId } = req.body;
    const newServiceFee = await ServiceFee.create({
      locationId,
      providerId,
      orderType,
      feeAmount,
      posSyncId,
    });
    res.status(201).json(newServiceFee);
  } catch (error) {
    logger.error(`Error creating service fee: ${error.message}`);
    res.status(500).json({ message: 'Error creating service fee', error: error.message });
  }
};

// Update an existing service fee
exports.updateServiceFee = async (req, res) => {
  try {
    const serviceFee = await ServiceFee.findByPk(req.params.id);
    if (!serviceFee) {
      return res.status(404).json({ message: 'Service fee not found' });
    }

    const updatedServiceFee = await serviceFee.update(req.body);
    res.json(updatedServiceFee);
  } catch (error) {
    logger.error(`Error updating service fee: ${error.message}`);
    res.status(500).json({ message: 'Error updating service fee', error: error.message });
  }
};

// Delete a service fee
exports.deleteServiceFee = async (req, res) => {
  try {
    const serviceFee = await ServiceFee.findByPk(req.params.id);
    if (!serviceFee) {
      return res.status(404).json({ message: 'Service fee not found' });
    }

    await serviceFee.destroy();
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting service fee: ${error.message}`);
    res.status(500).json({ message: 'Error deleting service fee', error: error.message });
  }
};
