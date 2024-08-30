const { GlobalMenu } = require('../models');
const logger = require('../services/logger');

exports.getAllGlobalMenus = async (req, res) => {
  try {
    const menus = await GlobalMenu.findAll();
    res.status(200).json(menus);
  } catch (error) {
    logger.error(`Error fetching global menus: ${error.message}`);
    res.status(500).json({ message: 'Error fetching global menus', error });
  }
};

exports.getGlobalMenuById = async (req, res) => {
  try {
    const menu = await GlobalMenu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Global menu not found' });
    res.status(200).json(menu);
  } catch (error) {
    logger.error(`Error fetching global menu by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching global menu', error });
  }
};

exports.createGlobalMenu = async (req, res) => {
  try {
    const newMenu = await GlobalMenu.create(req.body);
    logger.info(`Global menu created: ${newMenu.id}`);
    res.status(201).json(newMenu);
  } catch (error) {
    logger.error(`Error creating global menu: ${error.message}`);
    res.status(500).json({ message: 'Error creating global menu', error });
  }
};

exports.updateGlobalMenu = async (req, res) => {
  try {
    const [updated] = await GlobalMenu.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Global menu not found' });

    const updatedMenu = await GlobalMenu.findByPk(req.params.id);
    logger.info(`Global menu updated: ${req.params.id}`);
    res.status(200).json(updatedMenu);
  } catch (error) {
    logger.error(`Error updating global menu: ${error.message}`);
    res.status(500).json({ message: 'Error updating global menu', error });
  }
};

exports.deleteGlobalMenu = async (req, res) => {
  try {
    const deleted = await GlobalMenu.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Global menu not found' });

    logger.info(`Global menu deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting global menu: ${error.message}`);
    res.status(500).json({ message: 'Error deleting global menu', error });
  }
};
