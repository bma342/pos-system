const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const MenuGroup = require('../models/MenuGroup');

// Get all groups for a menu
router.get('/menu/:menuId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const groups = await MenuGroup.findAll({ where: { menuId: req.params.menuId } });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups', error });
  }
});

// Create a new menu group
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { name, description, menuId } = req.body;
    const group = await MenuGroup.create({ name, description, menuId });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error creating group', error });
  }
});

// Update a menu group
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const group = await MenuGroup.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    await group.update(req.body);
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error updating group', error });
  }
});

// Delete a menu group
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const group = await MenuGroup.findByPk(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    await group.destroy();
    res.json({ message: 'Group deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting group', error });
  }
});

module.exports = router;
