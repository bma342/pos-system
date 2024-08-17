const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Guest = require('../models/Guest');

// Get all guests
router.get('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const guests = await Guest.findAll();
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guests', error });
  }
});

// Get a specific guest
router.get('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guest', error });
  }
});

// Update a guest profile
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    await guest.update(req.body);
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating guest profile', error });
  }
});

// Delete a guest profile
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    await guest.destroy();
    res.json({ message: 'Guest deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting guest profile', error });
  }
});

module.exports = router;
