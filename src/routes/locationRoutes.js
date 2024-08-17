const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Location = require('../models/Location');

// Get all locations
router.get('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
});

// Create a new location
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { name, address, posSystem, locationHours } = req.body;
    const location = await Location.create({ name, address, posSystem, locationHours });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error creating location', error });
  }
});

// Update a location
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    await location.update(req.body);
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error });
  }
});

// Delete a location
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ message: 'Location not found' });

    await location.destroy();
    res.json({ message: 'Location deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting location', error });
  }
});

module.exports = router;
