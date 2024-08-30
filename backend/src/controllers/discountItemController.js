const { DiscountItem } = require('../models');
const logger = require('../services/logger');

exports.getAllDiscountItems = async (req, res) => {
  try {
    const discountItems = await DiscountItem.findAll();
    res.status(200).json(discountItems);
  } catch (error) {
    logger.error(`Error fetching discount items: ${error.message}`);
    res.status(500).json({ message: 'Error fetching discount items', error });
  }
};

exports.getDiscountItemById = async (req, res) => {
  try {
    const discountItem = await DiscountItem.findByPk(req.params.id);
    if (!discountItem) return res.status(404).json({ message: 'Discount item not found' });
    res.status(200).json(discountItem);
  } catch (error) {
    logger.error(`Error fetching discount item by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching discount item', error });
  }
};

exports.createDiscountItem = async (req, res) => {
  try {
    const newDiscountItem = await DiscountItem.create(req.body);
    logger.info(`Discount item created: ${newDiscountItem.id}`);
    res.status(201).json(newDiscountItem);
  } catch (error) {
    logger.error(`Error creating discount item: ${error.message}`);
    res.status(500).json({ message: 'Error creating discount item', error });
  }
};

exports.updateDiscountItem = async (req, res) => {
  try {
    const [updated] = await DiscountItem.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Discount item not found' });

    const updatedDiscountItem = await DiscountItem.findByPk(req.params.id);
    logger.info(`Discount item updated: ${req.params.id}`);
    res.status(200).json(updatedDiscountItem);
  } catch (error) {
    logger.error(`Error updating discount item: ${error.message}`);
    res.status(500).json({ message: 'Error updating discount item', error });
  }
};

exports.deleteDiscountItem = async (req, res) => {
  try {
    const deleted = await DiscountItem.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Discount item not found' });

    logger.info(`Discount item deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting discount item: ${error.message}`);
    res.status(500).json({ message: 'Error deleting discount item', error });
  }
};
