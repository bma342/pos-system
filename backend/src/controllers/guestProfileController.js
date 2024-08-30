const { GuestProfile } = require('../models');
const logger = require('../services/logger');

exports.getAllGuestProfiles = async (req, res) => {
  try {
    const profiles = await GuestProfile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    logger.error(`Error fetching guest profiles: ${error.message}`);
    res.status(500).json({ message: 'Error fetching guest profiles', error });
  }
};

exports.getGuestProfileById = async (req, res) => {
  try {
    const profile = await GuestProfile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Guest profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    logger.error(`Error fetching guest profile by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching guest profile', error });
  }
};

exports.createGuestProfile = async (req, res) => {
  try {
    const newProfile = await GuestProfile.create(req.body);
    logger.info(`Guest profile created: ${newProfile.id}`);
    res.status(201).json(newProfile);
  } catch (error) {
    logger.error(`Error creating guest profile: ${error.message}`);
    res.status(500).json({ message: 'Error creating guest profile', error });
  }
};

exports.updateGuestProfile = async (req, res) => {
  try {
    const [updated] = await GuestProfile.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Guest profile not found' });

    const updatedProfile = await GuestProfile.findByPk(req.params.id);
    logger.info(`Guest profile updated: ${req.params.id}`);
    res.status(200).json(updatedProfile);
  } catch (error) {
    logger.error(`Error updating guest profile: ${error.message}`);
    res.status(500).json({ message: 'Error updating guest profile', error });
  }
};

exports.deleteGuestProfile = async (req, res) => {
  try {
    const deleted = await GuestProfile.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Guest profile not found' });

    logger.info(`Guest profile deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting guest profile: ${error.message}`);
    res.status(500).json({ message: 'Error deleting guest profile', error });
  }
};
