const LocationCard = require('../models/LocationCard');
const logger = require('../services/logger');

exports.getLocationCard = async (req, res) => {
  try {
    const { locationId } = req.params;
    const locationCard = await LocationCard.findByPk(locationId);

    if (!locationCard) {
      return res.status(404).json({ message: 'Location card not found' });
    }

    res.status(200).json(locationCard);
  } catch (error) {
    logger.error(`Error fetching location card: ${error.message}`);
    res.status(500).json({ message: 'Error fetching location card', error: error.message });
  }
};

exports.updateLocationCard = async (req, res) => {
  try {
    const { locationId } = req.params;
    const updateData = req.body;

    const locationCard = await LocationCard.findByPk(locationId);

    if (!locationCard) {
      return res.status(404).json({ message: 'Location card not found' });
    }

    await locationCard.update(updateData);

    res.status(200).json(locationCard);
  } catch (error) {
    logger.error(`Error updating location card: ${error.message}`);
    res.status(500).json({ message: 'Error updating location card', error: error.message });
  }
};

module.exports = exports;
