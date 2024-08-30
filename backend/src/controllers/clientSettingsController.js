const { ClientSettings } = require('../models');
const logger = require('../services/logger');

exports.getAllClientSettings = async (req, res) => {
  try {
    const settings = await ClientSettings.findAll();
    res.status(200).json(settings);
  } catch (error) {
    logger.error(`Error fetching client settings: ${error.message}`);
    res.status(500).json({ message: 'Error fetching client settings', error });
  }
};

exports.getClientSettingById = async (req, res) => {
  try {
    const setting = await ClientSettings.findByPk(req.params.id);
    if (!setting) return res.status(404).json({ message: 'Client setting not found' });
    res.status(200).json(setting);
  } catch (error) {
    logger.error(`Error fetching client setting by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching client setting', error });
  }
};

exports.createClientSetting = async (req, res) => {
  try {
    const newSetting = await ClientSettings.create(req.body);
    logger.info(`Client setting created: ${newSetting.id}`);
    res.status(201).json(newSetting);
  } catch (error) {
    logger.error(`Error creating client setting: ${error.message}`);
    res.status(500).json({ message: 'Error creating client setting', error });
  }
};

exports.updateClientSetting = async (req, res) => {
  try {
    const [updated] = await ClientSettings.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Client setting not found' });

    const updatedSetting = await ClientSettings.findByPk(req.params.id);
    logger.info(`Client setting updated: ${req.params.id}`);
    res.status(200).json(updatedSetting);
  } catch (error) {
    logger.error(`Error updating client setting: ${error.message}`);
    res.status(500).json({ message: 'Error updating client setting', error });
  }
};

exports.deleteClientSetting = async (req, res) => {
  try {
    const deleted = await ClientSettings.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Client setting not found' });

    logger.info(`Client setting deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting client setting: ${error.message}`);
    res.status(500).json({ message: 'Error deleting client setting', error });
  }
};
