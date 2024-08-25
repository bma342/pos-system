const db = require('../models');
const logger = require('../services/logger');
const { authorizeRoles } = require('../middleware/auth');

const createDiscount = [
  authorizeRoles('Admin', 'Manager'), // Ensure only Admins or Managers can create discounts
  async (req, res) => {
    try {
      const { name, type, value, conditions, locationId, isGlobal, maxUsesPerGuest } = req.body;

      // Data validation checks
      if (!name || !type || !value) {
        return res.status(422).json({ message: 'Name, type, and value are required fields.' });
      }

      const discount = await db.Discount.create({
        name,
        type,
        value,
        conditions,
        locationId,
        isGlobal,
        maxUsesPerGuest,
        status: 'active',
      });

      logger.info(`Discount ${discount.name} created by User ${req.user.id} at IP ${req.ip}`);
      res.status(201).json(discount);
    } catch (error) {
      logger.error(`Error creating discount: ${error.message}`, { userId: req.user.id, ip: req.ip });
      res.status(500).json({ message: 'Failed to create discount', error });
    }
  }
];

const getDiscountsByLocation = [
  authorizeRoles('Admin', 'Manager', 'User'), // Allow Admins, Managers, and Users to view discounts
  async (req, res) => {
    try {
      const { locationId } = req.params;
      const discounts = await db.Discount.findAll({ where: { locationId } });
      logger.info(`Discounts retrieved by User ${req.user.id} for Location ${locationId}`);
      res.status(200).json(discounts);
    } catch (error) {
      logger.error(`Error retrieving discounts for Location ${req.params.locationId}: ${error.message}`, { userId: req.user.id, ip: req.ip });
      res.status(500).json({ message: 'Failed to retrieve discounts', error });
    }
  }
];

module.exports = { createDiscount, getDiscountsByLocation };
