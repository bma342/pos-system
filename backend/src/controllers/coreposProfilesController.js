const { CorePOSProfile } = require('../models');
const logger = require('../services/logger');

exports.getAllCorePOSProfiles = async (req, res) => {
  try {
    const profiles = await CorePOSProfile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    logger.error(`Error fetching CorePOS profiles: ${error.message}`);
    res.status(500).json({ message: 'Error fetching CorePOS profiles', error });
  }
};

exports.getCorePOSProfileById = async (req, res) => {
  try {
    const profile = await CorePOSProfile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ message: 'CorePOS profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    logger.error(`Error fetching CorePOS profile by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching CorePOS profile', error });
  }
};

exports.createCorePOSProfile = async (req, res) => {
  try {
    const newProfile = await CorePOSProfile.create(req.body);
    logger.info(`CorePOS profile created: ${newProfile.id}`);
    res.status(201).json(newProfile);
  } catch (error) {
    logger.error(`Error creating CorePOS profile: ${error.message}`);
    res.status(500).json({ message: 'Error creating CorePOS profile', error });
  }
};

exports.updateCorePOSProfile = async (req, res) => {
  try {
    const [updated] = await CorePOSProfile.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'CorePOS profile not found' });

    const updatedProfile = await CorePOSProfile.findByPk(req.params.id);
    logger.info(`CorePOS profile updated: ${req.params.id}`);
    res.status(200).json(updatedProfile);
  } catch (error) {
    logger.error(`Error updating CorePOS profile: ${error.message}`);
    res.status(500).json({ message: 'Error updating CorePOS profile', error });
  }
};

exports.deleteCorePOSProfile = async (req, res) => {
  try {
    const deleted = await CorePOSProfile.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'CorePOS profile not found' });

    logger.info(`CorePOS profile deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting CorePOS profile: ${error.message}`);
    res.status(500).json({ message: 'Error deleting CorePOS profile', error });
  }
};
