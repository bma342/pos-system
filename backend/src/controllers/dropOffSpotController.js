const db = require('../models');
const logger = require('../services/logger');

// Create a new drop-off spot
exports.createDropOffSpot = async (req, res) => {
  try {
    const { locationId } = req.params;
    const spotDetails = req.body;

    const location = await db.Location.findByPk(locationId);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    const newDropOffSpot = await db.DropOffSpot.create({
      ...spotDetails,
      locationId,
    });

    logger.info(`Drop-off spot created for location ID ${locationId}`);
    res.status(201).json(newDropOffSpot);
  } catch (error) {
    logger.error(`Error creating drop-off spot: ${error.message}`);
    res.status(500).json({ message: 'Error creating drop-off spot', error });
  }
};

// Update an existing drop-off spot
exports.updateDropOffSpot = async (req, res) => {
  try {
    const { spotId } = req.params;
    const spotDetails = req.body;

    const dropOffSpot = await db.DropOffSpot.findByPk(spotId);
    if (!dropOffSpot) {
      return res.status(404).json({ message: 'Drop-off spot not found' });
    }

    await dropOffSpot.update(spotDetails);

    logger.info(`Drop-off spot updated: ID ${spotId}`);
    res.status(200).json(dropOffSpot);
  } catch (error) {
    logger.error(`Error updating drop-off spot: ${error.message}`);
    res.status(500).json({ message: 'Error updating drop-off spot', error });
  }
};

// Fetch all drop-off spots for a location
exports.getDropOffSpots = async (req, res) => {
  try {
    const { locationId } = req.params;

    const dropOffSpots = await db.DropOffSpot.findAll({ where: { locationId } });

    res.status(200).json(dropOffSpots);
  } catch (error) {
    logger.error(`Error fetching drop-off spots: ${error.message}`);
    res.status(500).json({ message: 'Error fetching drop-off spots', error });
  }
};

// Fetch a single drop-off spot by ID
exports.getDropOffSpotById = async (req, res) => {
  try {
    const { spotId } = req.params;

    const dropOffSpot = await db.DropOffSpot.findByPk(spotId);
    if (!dropOffSpot) {
      return res.status(404).json({ message: 'Drop-off spot not found' });
    }

    res.status(200).json(dropOffSpot);
  } catch (error) {
    logger.error(`Error fetching drop-off spot: ${error.message}`);
    res.status(500).json({ message: 'Error fetching drop-off spot', error });
  }
};

// Delete a drop-off spot
exports.deleteDropOffSpot = async (req, res) => {
  try {
    const { spotId } = req.params;

    const dropOffSpot = await db.DropOffSpot.findByPk(spotId);
    if (!dropOffSpot) {
      return res.status(404).json({ message: 'Drop-off spot not found' });
    }

    await dropOffSpot.destroy();

    logger.info(`Drop-off spot deleted: ID ${spotId}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting drop-off spot: ${error.message}`);
    res.status(500).json({ message: 'Error deleting drop-off spot', error });
  }
};
