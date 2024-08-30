const { GlobalSetting } = require('../models');
const logger = require('../services/logger');

exports.getAllGlobalSettings = async (req, res) => {
  try {
    const settings = await GlobalSetting.findAll();
    res.status(200).json(settings);
  } catch (error) {
    logger.error(`Error fetching global settings: ${error.message}`);
    res.status(500).json({ message: 'Error fetching global settings', error });
  }
};

exports.getGlobalSettingById = async (req, res) => {
  try {
    const setting = await GlobalSetting.findByPk(req.params.id);
    if (!setting) return res.status(404).json({ message: 'Global setting not found' });
    res.status(200).json(setting);
  } catch (error) {
    logger.error(`Error fetching global setting by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching global setting', error });
  }
};

exports.createGlobalSetting = async (req, res) => {
  try {
    const newSetting = await GlobalSetting.create(req.body);
    logger.info(`Global setting created: ${newSetting.id}`);
    res.status(201).json(newSetting);
  } catch (error) {
    logger.error(`Error creating global setting: ${error.message}`);
    res.status(500).json({ message: 'Error creating global setting', error });
  }
};

exports.updateGlobalSetting = async (req, res) => {
  try {
    const [updated] = await GlobalSetting.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Global setting not found' });

    const updatedSetting = await GlobalSetting.findByPk(req.params.id);
    logger.info(`Global setting updated: ${req.params.id}`);
    res.status(200).json(updatedSetting);
  } catch (error) {
    logger.error(`Error updating global setting: ${error.message}`);
    res.status(500).json({ message: 'Error updating global setting', error });
  }
};

exports.deleteGlobalSetting = async (req, res) => {
  try {
    const deleted = await GlobalSetting.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Global setting not found' });

    logger.info(`Global setting deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting global setting: ${error.message}`);
    res.status(500).json({ message: 'Error deleting global setting', error });
  }
};
