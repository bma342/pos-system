const { HouseAccountLocation } = require('../models');
const logger = require('../services/logger');

exports.getAllHouseAccountLocations = async (req, res) => {
  try {
    const locations = await HouseAccountLocation.findAll();
    res.status(200).json(locations);
  } catch (error) {
    logger.error(`Error fetching house account locations: ${error.message}`);
    res.status(500).json({ message: 'Error fetching house account locations', error });
  }
};

exports.getHouseAccountLocationById = async (req, res) => {
  try {
    const location = await HouseAccountLocation.findByPk(req.params.id);
    if (!location) return res.status(404).json({ message: 'House account location not found' });
    res.status(200).json(location);
  } catch (error) {
    logger.error(`Error fetching house account location by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching house account location', error });
  }
};

exports.createHouseAccountLocation = async (req, res) => {
  try {
    const newLocation = await HouseAccountLocation.create(req.body);
    logger.info(`House account location created: ${newLocation.id}`);
    res.status(201).json(newLocation);
  } catch (error) {
    logger.error(`Error creating house account location: ${error.message}`);
    res.status(500).json({ message: 'Error creating house account location', error });
  }
};

exports.updateHouseAccountLocation = async (req, res) => {
  try {
    const [updated] = await HouseAccountLocation.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'House account location not found' });

    const updatedLocation = await HouseAccountLocation.findByPk(req.params.id);
    logger.info(`House account location updated: ${req.params.id}`);
    res.status(200).json(updatedLocation);
  } catch (error) {
    logger.error(`Error updating house account location: ${error.message}`);
    res.status(500).json({ message: 'Error updating house account location', error });
  }
};

exports.deleteHouseAccountLocation = async (req, res) => {
  try {
    const deleted = await HouseAccountLocation.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'House account location not found' });

    logger.info(`House account location deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting house account location: ${error.message}`);
    res.status(500).json({ message: 'Error deleting house account location', error });
  }
};
