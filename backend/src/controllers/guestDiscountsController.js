const { GuestDiscount } = require('../models');
const logger = require('../services/logger');

exports.getAllGuestDiscounts = async (req, res) => {
  try {
    const discounts = await GuestDiscount.findAll();
    res.status(200).json(discounts);
  } catch (error) {
    logger.error(`Error fetching guest discounts: ${error.message}`);
    res.status(500).json({ message: 'Error fetching guest discounts', error });
  }
};

exports.getGuestDiscountById = async (req, res) => {
  try {
    const discount = await GuestDiscount.findByPk(req.params.id);
    if (!discount) return res.status(404).json({ message: 'Guest discount not found' });
    res.status(200).json(discount);
  } catch (error) {
    logger.error(`Error fetching guest discount by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching guest discount', error });
  }
};

exports.createGuestDiscount = async (req, res) => {
  try {
    const newDiscount = await GuestDiscount.create(req.body);
    logger.info(`Guest discount created: ${newDiscount.id}`);
    res.status(201).json(newDiscount);
  } catch (error) {
    logger.error(`Error creating guest discount: ${error.message}`);
    res.status(500).json({ message: 'Error creating guest discount', error });
  }
};

exports.updateGuestDiscount = async (req, res) => {
  try {
    const [updated] = await GuestDiscount.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Guest discount not found' });

    const updatedDiscount = await GuestDiscount.findByPk(req.params.id);
    logger.info(`Guest discount updated: ${req.params.id}`);
    res.status(200).json(updatedDiscount);
  } catch (error) {
    logger.error(`Error updating guest discount: ${error.message}`);
    res.status(500).json({ message: 'Error updating guest discount', error });
  }
};

exports.deleteGuestDiscount = async (req, res) => {
  try {
    const deleted = await GuestDiscount.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Guest discount not found' });

    logger.info(`Guest discount deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting guest discount: ${error.message}`);
    res.status(500).json({ message: 'Error deleting guest discount', error });
  }
};
