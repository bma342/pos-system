const { CateringMenu } = require('../models');

exports.getAllCateringMenus = async (req, res) => {
  try {
    const menus = await CateringMenu.findAll({ where: { clientId: req.user.clientId } });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering menus', error: error.message });
  }
};

exports.createCateringMenu = async (req, res) => {
  try {
    const newMenu = await CateringMenu.create({ ...req.body, clientId: req.user.clientId });
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: 'Error creating catering menu', error: error.message });
  }
};

exports.getCateringMenu = async (req, res) => {
  try {
    const menu = await CateringMenu.findOne({ 
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (menu) {
      res.json(menu);
    } else {
      res.status(404).json({ message: 'Catering menu not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering menu', error: error.message });
  }
};

exports.updateCateringMenu = async (req, res) => {
  try {
    const [updated] = await CateringMenu.update(req.body, {
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (updated) {
      const updatedMenu = await CateringMenu.findOne({ where: { id: req.params.id } });
      res.json(updatedMenu);
    } else {
      res.status(404).json({ message: 'Catering menu not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating catering menu', error: error.message });
  }
};

exports.deleteCateringMenu = async (req, res) => {
  try {
    const deleted = await CateringMenu.destroy({
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Catering menu not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catering menu', error: error.message });
  }
};
