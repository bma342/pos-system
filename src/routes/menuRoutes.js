const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');

// Get all menus for a client
router.get('/client/:clientId', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const menus = await Menu.findAll({
      where: { clientId: req.params.clientId },
      include: [
        {
          model: MenuItem,
          attributes: ['name', 'basePrice', 'pointsPrice'],
        },
      ],
    });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menus', error });
  }
});

// Create a new menu
router.post('/', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const { name, description, clientId } = req.body;
    const menu = await Menu.create({ name, description, clientId });
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu', error });
  }
});

// Update a menu
router.put('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });

    await menu.update(req.body);
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu', error });
  }
});

// Delete a menu
router.delete('/:id', authenticateToken, authorizeRoles(1, 2), async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });

    await menu.destroy();
    res.json({ message: 'Menu deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu', error });
  }
});

module.exports = router;
