const { ClientPreferences } = require('../models');
const logger = require('../services/logger');

exports.getAllClientPreferences = async (req, res) => {
  try {
    const preferences = await ClientPreferences.findAll();
    res.status(200).json(preferences);
  } catch (error) {
    logger.error(`Error fetching client preferences: ${error.message}`);
    res.status(500).json({ message: 'Error fetching client preferences', error });
  }
};

exports.getClientPreferenceById = async (req, res) => {
  try {
    const preference = await ClientPreferences.findByPk(req.params.id);
    if (!preference) return res.status(404).json({ message: 'Client preference not found' });
    res.status(200).json(preference);
  } catch (error) {
    logger.error(`Error fetching client preference by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching client preference', error });
  }
};

exports.createClientPreference = async (req, res) => {
  try {
    const newPreference = await ClientPreferences.create(req.body);
    logger.info(`Client preference created: ${newPreference.id}`);
    res.status(201).json(newPreference);
  } catch (error) {
    logger.error(`Error creating client preference: ${error.message}`);
    res.status(500).json({ message: 'Error creating client preference', error });
  }
};

exports.updateClientPreference = async (req, res) => {
  try {
    const [updated] = await ClientPreferences.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Client preference not found' });

    const updatedPreference = await ClientPreferences.findByPk(req.params.id);
    logger.info(`Client preference updated: ${req.params.id}`);
    res.status(200).json(updatedPreference);
  } catch (error) {
    logger.error(`Error updating client preference: ${error.message}`);
    res.status(500).json({ message: 'Error updating client preference', error });
  }
};

exports.deleteClientPreference = async (req, res) => {
  try {
    const deleted = await ClientPreferences.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Client preference not found' });

    logger.info(`Client preference deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting client preference: ${error.message}`);
    res.status(500).json({ message: 'Error deleting client preference', error });
  }
};
