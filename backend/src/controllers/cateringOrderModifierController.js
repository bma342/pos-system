const { CateringOrderModifier } = require('../models');

exports.getAllModifiers = async (req, res) => {
  try {
    const modifiers = await CateringOrderModifier.findAll();
    res.json(modifiers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering order modifiers', error: error.message });
  }
};

exports.createModifier = async (req, res) => {
  try {
    const newModifier = await CateringOrderModifier.create(req.body);
    res.status(201).json(newModifier);
  } catch (error) {
    res.status(400).json({ message: 'Error creating catering order modifier', error: error.message });
  }
};

exports.getModifier = async (req, res) => {
  try {
    const modifier = await CateringOrderModifier.findByPk(req.params.id);
    if (modifier) {
      res.json(modifier);
    } else {
      res.status(404).json({ message: 'Catering order modifier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering order modifier', error: error.message });
  }
};

exports.updateModifier = async (req, res) => {
  try {
    const [updated] = await CateringOrderModifier.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedModifier = await CateringOrderModifier.findByPk(req.params.id);
      res.json(updatedModifier);
    } else {
      res.status(404).json({ message: 'Catering order modifier not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating catering order modifier', error: error.message });
  }
};

exports.deleteModifier = async (req, res) => {
  try {
    const deleted = await CateringOrderModifier.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Catering order modifier not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catering order modifier', error: error.message });
  }
};
