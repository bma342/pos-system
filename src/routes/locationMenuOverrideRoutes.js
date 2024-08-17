const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const LocationMenuOverride = require('../models/LocationMenuOverride');
const { check, validationResult } = require('express-validator');

// Get all overrides for a location
router.get('/location/:locationId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const overrides = await LocationMenuOverride.findAll({ where: { locationId: req.params.locationId } });
    res.json(overrides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overrides', error });
  }
});

// Create a new location-specific override
router.post(
  '/',
  authenticateToken,
  authorizeRoles(1, 2),
  [
    check('locationId').isInt().withMessage('locationId must be an integer'),
    check('menuItemId').isInt().withMessage('menuItemId must be an integer'),
    check('price').optional().isFloat({ min: 0 }).withMessage('price must be a positive number'),
    check('upliftPercentage').optional().isFloat({ min: 0 }).withMessage('upliftPercentage must be a positive number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { price, isAvailable, upliftPercentage, locationId, menuItemId } = req.body;
      const override = await LocationMenuOverride.create({
        price,
        isAvailable,
        upliftPercentage,
        locationId,
        menuItemId,
      });
      res.status(201).json(override);
    } catch (error) {
      res.status(500).json({ message: 'Error creating override', error });
    }
  }
);

// Update location-specific override
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(1, 2),
  [
    check('price').optional().isFloat({ min: 0 }).withMessage('price must be a positive number'),
    check('upliftPercentage').optional().isFloat({ min: 0 }).withMessage('upliftPercentage must be a positive number'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const override = await LocationMenuOverride.findByPk(req.params.id);
      if (!override) return res.status(404).json({ message: 'Override not found' });

      await override.update(req.body);
      res.json(override);
    } catch (error) {
      res.status(500).json({ message: 'Error updating override', error });
    }
  }
);

// Delete location-specific override
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const override = await LocationMenuOverride.findByPk(req.params.id);
    if (!override) return res.status(404).json({ message: 'Override not found' });

    await override.destroy();
    res.json({ message: 'Override deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting override', error });
  }
});

module.exports = router;
