const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const ProviderPricing = require('../models/ProviderPricing');

// Get all provider-specific pricings for a location menu override
router.get('/override/:locationMenuOverrideId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const providerPricings = await ProviderPricing.findAll({ where: { locationMenuOverrideId: req.params.locationMenuOverrideId } });
    res.json(providerPricings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching provider pricings', error });
  }
});

// Create a new provider-specific pricing
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { provider, upliftPercentage, locationMenuOverrideId, shouldRound } = req.body;
    const providerPricing = await ProviderPricing.create({
      provider,
      upliftPercentage,
      locationMenuOverrideId,
      shouldRound,
    });
    res.status(201).json(providerPricing);
  } catch (error) {
    res.status(500).json({ message: 'Error creating provider pricing', error });
  }
});

// Update provider-specific pricing
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const providerPricing = await ProviderPricing.findByPk(req.params.id);
    if (!providerPricing) return res.status(404).json({ message: 'Provider pricing not found' });

    await providerPricing.update(req.body);
    res.json(providerPricing);
  } catch (error) {
    res.status(500).json({ message: 'Error updating provider pricing', error });
  }
});

// Delete provider-specific pricing
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const providerPricing = await ProviderPricing.findByPk(req.params.id);
    if (!providerPricing) return res.status(404).json({ message: 'Provider pricing not found' });

    await providerPricing.destroy();
    res.json({ message: 'Provider pricing deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting provider pricing', error });
  }
});

module.exports = router;
