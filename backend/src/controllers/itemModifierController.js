const { ItemModifier } = require('../models');
const logger = require('../services/logger');

exports.getAllItemModifiers = async (req, res) => {
  try {
    const modifiers = await ItemModifier.findAll();
    res.status(200).json(modifiers);
  } catch (error) {
    logger.error(`Error fetching item modifiers: ${error.message}`);
    res.status(500).json({ message: 'Error fetching item modifiers', error });
  }
};

exports.getItemModifierById = async (req, res) => {
  try {
    const modifier = await ItemModifier.findByPk(req.params.id);
    if (!modifier) return res.status(404).json({ message: 'Item modifier not found' });
    res.status(200).json(modifier);
  } catch (error) {
    logger.error(`Error fetching item modifier by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching item modifier', error });
  }
};

exports.createItemModifier = async (req, res) => {
  try {
    const newModifier = await ItemModifier.create(req.body);
    logger.info(`Item modifier created: ${newModifier.id}`);
    res.status(201).json(newModifier);
  } catch (error) {
    logger.error(`Error creating item modifier: ${error.message}`);
    res.status(500).json({ message: 'Error creating item modifier', error });
  }
};

exports.updateItemModifier = async (req, res) => {
  try {
    const [updated] = await ItemModifier.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Item modifier not found' });

    const updatedModifier = await ItemModifier.findByPk(req.params.id);
    logger.info(`Item modifier updated: ${req.params.id}`);
    res.status(200).json(updatedModifier);
  } catch (error) {
    logger.error(`Error updating item modifier: ${error.message}`);
    res.status(500).json({ message: 'Error updating item modifier', error });
  }
};

exports.deleteItemModifier = async (req, res) => {
  try {
    const deleted = await ItemModifier.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Item modifier not found' });

    logger.info(`Item modifier deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting item modifier: ${error.message}`);
    res.status(500).json({ message: 'Error deleting item modifier', error });
  }
};
