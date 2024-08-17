const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Modifier = require('../models/Modifier');

// Get all modifiers for a menu item
router.get('/item/:menuItemId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const modifiers = await Modifier.findAll({ where: { menuItemId: req.params.menuItemId } });
    res.json(modifiers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching modifiers', error });
  }
});

// Create a new modifier
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { name, price, menuItemId } = req.body;
    const modifier = await Modifier.create({ name, price, menuItemId });
    res.status(201).json(modifier);
  } catch (error) {
    res.status(500).json({ message: 'Error creating modifier', error });
  }
});

// Update a modifier
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const modifier = await Modifier.findByPk(req.params.id);
    if (!modifier) return res.status(404).json({ message: 'Modifier not found' });

    await modifier.update(req.body);
    res.json(modifier);
  } catch (error) {
    res.status(500).json({ message: 'Error updating modifier', error });
  }
});

// Delete a modifier
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const modifier = await Modifier.findByPk(req.params.id);
    if (!modifier) return res.status(404).json({ message: 'Modifier not found' });

    await modifier.destroy();
    res.json({ message: 'Modifier deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting modifier', error });
  }
});

module.exports = router;
