const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Branding = require('../models/Branding');

// Get branding settings for a client
router.get('/client/:clientId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const branding = await Branding.findOne({ where: { clientId: req.params.clientId } });
    res.json(branding);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching branding settings', error });
  }
});

// Update branding settings for a client
router.put('/client/:clientId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const branding = await Branding.findOne({ where: { clientId: req.params.clientId } });
    if (!branding) return res.status(404).json({ message: 'Branding settings not found.' });

    await branding.update(req.body);
    res.json(branding);
  } catch (error) {
    res.status(500).json({ message: 'Error updating branding settings', error });
  }
});

module.exports = router;
