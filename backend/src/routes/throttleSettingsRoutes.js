const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Location = require('../models/Location');

// Update throttle settings for a location
router.put('/location/:locationId/throttle-settings', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { locationId } = req.params;
    const { throttleSettings } = req.body;

    const location = await Location.findByPk(locationId);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    location.throttleSettings = throttleSettings;
    await location.save();

    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error updating throttle settings', error });
  }
});

module.exports = router;
