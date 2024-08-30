const { CateringMenuItem } = require('../models');

exports.getAllCateringMenuItems = async (req, res) => {
  try {
    const items = await CateringMenuItem.findAll({ where: { menuId: req.params.menuId } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering menu items', error: error.message });
  }
};

exports.createCateringMenuItem = async (req, res) => {
  try {
    const newItem = await CateringMenuItem.create({ ...req.body, menuId: req.params.menuId });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating catering menu item', error: error.message });
  }
};

exports.getCateringMenuItem = async (req, res) => {
  try {
    const item = await CateringMenuItem.findOne({ 
      where: { id: req.params.id, menuId: req.params.menuId }
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Catering menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering menu item', error: error.message });
  }
};

exports.updateCateringMenuItem = async (req, res) => {
  try {
    const [updated] = await CateringMenuItem.update(req.body, {
      where: { id: req.params.id, menuId: req.params.menuId }
    });
    if (updated) {
      const updatedItem = await CateringMenuItem.findOne({ where: { id: req.params.id } });
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Catering menu item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating catering menu item', error: error.message });
  }
};

exports.deleteCateringMenuItem = async (req, res) => {
  try {
    const deleted = await CateringMenuItem.destroy({
      where: { id: req.params.id, menuId: req.params.menuId }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Catering menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catering menu item', error: error.message });
  }
};
