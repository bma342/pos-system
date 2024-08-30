const { CommissaryLocation } = require('../models');
const logger = require('../services/logger');

exports.getAllCommissaryLocations = async (req, res) => {
  try {
    const locations = await CommissaryLocation.findAll();
    res.status(200).json(locations);
  } catch (error) {
    logger.error(`Error fetching commissary locations: ${error.message}`);
    res.status(500).json({ message: 'Error fetching commissary locations', error });
  }
};

exports.getCommissaryLocationById = async (req, res) => {
  try {
    const location = await CommissaryLocation.findByPk(req.params.id);
    if (!location) return res.status(404).json({ message: 'Commissary location not found' });
    res.status(200).json(location);
  } catch (error) {
    logger.error(`Error fetching commissary location by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching commissary location', error });
  }
};

exports.createCommissaryLocation = async (req, res) => {
  try {
    const newLocation = await CommissaryLocation.create(req.body);
    logger.info(`Commissary location created: ${newLocation.id}`);
    res.status(201).json(newLocation);
  } catch (error) {
    logger.error(`Error creating commissary location: ${error.message}`);
    res.status(500).json({ message: 'Error creating commissary location', error });
  }
};

exports.updateCommissaryLocation = async (req, res) => {
  try {
    const [updated] = await CommissaryLocation.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Commissary location not found' });

    const updatedLocation = await CommissaryLocation.findByPk(req.params.id);
    logger.info(`Commissary location updated: ${req.params.id}`);
    res.status(200).json(updatedLocation);
  } catch (error) {
    logger.error(`Error updating commissary location: ${error.message}`);
    res.status(500).json({ message: 'Error updating commissary location', error });
  }
};

exports.deleteCommissaryLocation = async (req, res) => {
  try {
    const deleted = await CommissaryLocation.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Commissary location not found' });

    logger.info(`Commissary location deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting commissary location: ${error.message}`);
    res.status(500).json({ message: 'Error deleting commissary location', error });
  }
};
