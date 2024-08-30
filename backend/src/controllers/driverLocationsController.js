const { DriverLocation } = require('../models');
const logger = require('../services/logger');

exports.getAllDriverLocations = async (req, res) => {
  try {
    const locations = await DriverLocation.findAll();
    res.status(200).json(locations);
  } catch (error) {
    logger.error(`Error fetching driver locations: ${error.message}`);
    res.status(500).json({ message: 'Error fetching driver locations', error });
  }
};

exports.getDriverLocationById = async (req, res) => {
  try {
    const location = await DriverLocation.findByPk(req.params.id);
    if (!location) return res.status(404).json({ message: 'Driver location not found' });
    res.status(200).json(location);
  } catch (error) {
    logger.error(`Error fetching driver location by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching driver location', error });
  }
};

exports.createDriverLocation = async (req, res) => {
  try {
    const newLocation = await DriverLocation.create(req.body);
    logger.info(`Driver location created: ${newLocation.id}`);
    res.status(201).json(newLocation);
  } catch (error) {
    logger.error(`Error creating driver location: ${error.message}`);
    res.status(500).json({ message: 'Error creating driver location', error });
  }
};

exports.updateDriverLocation = async (req, res) => {
  try {
    const [updated] = await DriverLocation.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Driver location not found' });

    const updatedLocation = await DriverLocation.findByPk(req.params.id);
    logger.info(`Driver location updated: ${req.params.id}`);
    res.status(200).json(updatedLocation);
  } catch (error) {
    logger.error(`Error updating driver location: ${error.message}`);
    res.status(500).json({ message: 'Error updating driver location', error });
  }
};

exports.deleteDriverLocation = async (req, res) => {
  try {
    const deleted = await DriverLocation.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Driver location not found' });

    logger.info(`Driver location deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting driver location: ${error.message}`);
    res.status(500).json({ message: 'Error deleting driver location', error });
  }
};
