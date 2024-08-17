const db = require('../models');

exports.getMenus = async (req, res) => {
  try {
    const menus = await db.Menu.findAll({ where: { clientId: req.params.clientId } });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menus', error });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const menu = await db.Menu.create(req.body);
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu', error });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const menu = await db.Menu.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu', error });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    await db.Menu.destroy({ where: { id: req.params.id } });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu', error });
  }
};
