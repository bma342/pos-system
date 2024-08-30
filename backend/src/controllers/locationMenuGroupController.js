const { LocationMenuGroup } = require('../models');
const logger = require('../services/logger');

exports.getAllLocationMenuGroups = async (req, res) => {
  try {
    const menuGroups = await LocationMenuGroup.findAll();
    res.status(200).json(menuGroups);
  } catch (error) {
    logger.error(`Error fetching location menu groups: ${error.message}`);
    res.status(500).json({ message: 'Error fetching location menu groups', error });
  }
};

exports.getLocationMenuGroupById = async (req, res) => {
  try {
    const menuGroup = await LocationMenuGroup.findByPk(req.params.id);
    if (!menuGroup) return res.status(404).json({ message: 'Location menu group not found' });
    res.status(200).json(menuGroup);
  } catch (error) {
    logger.error(`Error fetching location menu group by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching location menu group', error });
  }
};

exports.createLocationMenuGroup = async (req, res) => {
  try {
    const newMenuGroup = await LocationMenuGroup.create(req.body);
    logger.info(`Location menu group created: ${newMenuGroup.id}`);
    res.status(201).json(newMenuGroup);
  } catch (error) {
    logger.error(`Error creating location menu group: ${error.message}`);
    res.status(500).json({ message: 'Error creating location menu group', error });
  }
};

exports.updateLocationMenuGroup = async (req, res) => {
  try {
    const [updated] = await LocationMenuGroup.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Location menu group not found' });

    const updatedMenuGroup = await LocationMenuGroup.findByPk(req.params.id);
    logger.info(`Location menu group updated: ${req.params.id}`);
    res.status(200).json(updatedMenuGroup);
  } catch (error) {
    logger.error(`Error updating location menu group: ${error.message}`);
    res.status(500).json({ message: 'Error updating location menu group', error });
  }
};

exports.deleteLocationMenuGroup = async (req, res) => {
  try {
    const deleted = await LocationMenuGroup.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Location menu group not found' });

    logger.info(`Location menu group deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting location menu group: ${error.message}`);
    res.status(500).json({ message: 'Error deleting location menu group', error });
  }
};
