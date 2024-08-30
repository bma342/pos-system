const { CateringAdmin, User, Location } = require('../models');

exports.getAllCateringAdmins = async (req, res) => {
  try {
    const cateringAdmins = await CateringAdmin.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Location, attributes: ['id', 'name'] }
      ]
    });
    res.json(cateringAdmins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering admins', error: error.message });
  }
};

exports.createCateringAdmin = async (req, res) => {
  try {
    const newCateringAdmin = await CateringAdmin.create(req.body);
    res.status(201).json(newCateringAdmin);
  } catch (error) {
    res.status(400).json({ message: 'Error creating catering admin', error: error.message });
  }
};

exports.getCateringAdmin = async (req, res) => {
  try {
    const cateringAdmin = await CateringAdmin.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Location, attributes: ['id', 'name'] }
      ]
    });
    if (cateringAdmin) {
      res.json(cateringAdmin);
    } else {
      res.status(404).json({ message: 'Catering admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering admin', error: error.message });
  }
};

exports.updateCateringAdmin = async (req, res) => {
  try {
    const [updated] = await CateringAdmin.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCateringAdmin = await CateringAdmin.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['id', 'name', 'email'] },
          { model: Location, attributes: ['id', 'name'] }
        ]
      });
      res.json(updatedCateringAdmin);
    } else {
      res.status(404).json({ message: 'Catering admin not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating catering admin', error: error.message });
  }
};

exports.deleteCateringAdmin = async (req, res) => {
  try {
    const deleted = await CateringAdmin.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Catering admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catering admin', error: error.message });
  }
};
