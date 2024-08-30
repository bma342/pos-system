const { LocationPosProfile } = require('../models');
const logger = require('../services/logger');

exports.getAllLocationPosProfiles = async (req, res) => {
  try {
    const posProfiles = await LocationPosProfile.findAll();
    res.status(200).json(posProfiles);
  } catch (error) {
    logger.error(`Error fetching location POS profiles: ${error.message}`);
    res.status(500).json({ message: 'Error fetching location POS profiles', error });
  }
};

exports.getLocationPosProfileById = async (req, res) => {
  try {
    const posProfile = await LocationPosProfile.findByPk(req.params.id);
    if (!posProfile) return res.status(404).json({ message: 'Location POS profile not found' });
    res.status(200).json(posProfile);
  } catch (error) {
    logger.error(`Error fetching location POS profile by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching location POS profile', error });
  }
};

exports.createLocationPosProfile = async (req, res) => {
  try {
    const newPosProfile = await LocationPosProfile.create(req.body);
    logger.info(`Location POS profile created: ${newPosProfile.id}`);
    res.status(201).json(newPosProfile);
  } catch (error) {
    logger.error(`Error creating location POS profile: ${error.message}`);
    res.status(500).json({ message: 'Error creating location POS profile', error });
  }
};

exports.updateLocationPosProfile = async (req, res) => {
  try {
    const [updated] = await LocationPosProfile.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Location POS profile not found' });

    const updatedPosProfile = await LocationPosProfile.findByPk(req.params.id);
    logger.info(`Location POS profile updated: ${req.params.id}`);
    res.status(200).json(updatedPosProfile);
  } catch (error) {
    logger.error(`Error updating location POS profile: ${error.message}`);
    res.status(500).json({ message: 'Error updating location POS profile', error });
  }
};

exports.deleteLocationPosProfile = async (req, res) => {
  try {
    const deleted = await LocationPosProfile.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Location POS profile not found' });

    logger.info(`Location POS profile deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting location POS profile: ${error.message}`);
    res.status(500).json({ message: 'Error deleting location POS profile', error });
  }
};
