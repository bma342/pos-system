const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const MenuItem = require('../models/MenuItem');

// Get all items for a menu group
router.get('/group/:menuGroupId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const items = await MenuItem.findAll({ where: { menuGroupId: req.params.menuGroupId } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// Create a new menu item
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { name, description, basePrice, menuGroupId } = req.body;
    const item = await MenuItem.create({ name, description, basePrice, menuGroupId });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error });
  }
});

// Update a menu item
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const item = await MenuItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
});

// Delete a menu item
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const item = await MenuItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.destroy();
    res.json({ message: 'Item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

module.exports = router;
