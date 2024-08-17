const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Catering = require('../models/Catering');

// Get all catering events for a location
router.get('/location/:locationId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const events = await Catering.findAll({ where: { locationId: req.params.locationId } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering events', error });
  }
});

// Create a new catering event
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { eventName, date, numberOfGuests, specialInstructions, locationId } = req.body;
    const event = await Catering.create({ eventName, date, numberOfGuests, specialInstructions, locationId });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating catering event', error });
  }
});

// Update a catering event
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const event = await Catering.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.update(req.body);
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
});

// Delete a catering event
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const event = await Catering.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.destroy();
    res.json({ message: 'Event deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});

module.exports = router;
