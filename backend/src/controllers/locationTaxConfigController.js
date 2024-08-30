const { LocationTaxConfig } = require('../models');
const logger = require('../services/logger');

exports.getAllLocationTaxConfigs = async (req, res) => {
  try {
    const taxConfigs = await LocationTaxConfig.findAll();
    res.status(200).json(taxConfigs);
  } catch (error) {
    logger.error(`Error fetching location tax configs: ${error.message}`);
    res.status(500).json({ message: 'Error fetching location tax configs', error });
  }
};

exports.getLocationTaxConfigById = async (req, res) => {
  try {
    const taxConfig = await LocationTaxConfig.findByPk(req.params.id);
    if (!taxConfig) return res.status(404).json({ message: 'Location tax config not found' });
    res.status(200).json(taxConfig);
  } catch (error) {
    logger.error(`Error fetching location tax config by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching location tax config', error });
  }
};

exports.createLocationTaxConfig = async (req, res) => {
  try {
    const newTaxConfig = await LocationTaxConfig.create(req.body);
    logger.info(`Location tax config created: ${newTaxConfig.id}`);
    res.status(201).json(newTaxConfig);
  } catch (error) {
    logger.error(`Error creating location tax config: ${error.message}`);
    res.status(500).json({ message: 'Error creating location tax config', error });
  }
};

exports.updateLocationTaxConfig = async (req, res) => {
  try {
    const [updated] = await LocationTaxConfig.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Location tax config not found' });

    const updatedTaxConfig = await LocationTaxConfig.findByPk(req.params.id);
    logger.info(`Location tax config updated: ${req.params.id}`);
    res.status(200).json(updatedTaxConfig);
  } catch (error) {
    logger.error(`Error updating location tax config: ${error.message}`);
    res.status(500).json({ message: 'Error updating location tax config', error });
  }
};

exports.deleteLocationTaxConfig = async (req, res) => {
  try {
    const deleted = await LocationTaxConfig.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Location tax config not found' });

    logger.info(`Location tax config deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting location tax config: ${error.message}`);
    res.status(500).json({ message: 'Error deleting location tax config', error });
  }
};
