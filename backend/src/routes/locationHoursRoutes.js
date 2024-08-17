const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const LocationHours = require('../models/LocationHours');

// Get all hours for a location
router.get('/location/:locationId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const hours = await LocationHours.findAll({ where: { locationId: req.params.locationId } });
    res.json(hours);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location hours', error });
  }
});

// Create new location hours
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { locationId, type, dayOfWeek, startTime, endTime, startDate, endDate } = req.body;
    const hours = await LocationHours.create({
      locationId,
      type,
      dayOfWeek,
      startTime,
      endTime,
      startDate,
      endDate,
    });
    res.status(201).json(hours);
  } catch (error) {
    res.status(500).json({ message: 'Error creating location hours', error });
  }
});

// Update location hours
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const hours = await LocationHours.findByPk(req.params.id);
    if (!hours) return res.status(404).json({ message: 'Hours not found' });

    await hours.update(req.body);
    res.json(hours);
  } catch (error) {
    res.status(500).json({ message: 'Error updating location hours', error });
  }
});

// Delete location hours
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const hours = await LocationHours.findByPk(req.params.id);
    if (!hours) return res.status(404).json({ message: 'Hours not found' });

    await hours.destroy();
    res.json({ message: 'Hours deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting location hours', error });
  }
});

module.exports = router;
