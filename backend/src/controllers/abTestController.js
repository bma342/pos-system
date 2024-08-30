const { ABTest, MenuItem, Client } = require('../models');

exports.getAllABTests = async (req, res) => {
  try {
    const abTests = await ABTest.findAll({
      where: { clientId: req.user.clientId },
      include: [{ model: MenuItem }, { model: Client }]
    });
    res.json(abTests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching AB tests', error: error.message });
  }
};

exports.createABTest = async (req, res) => {
  try {
    const newABTest = await ABTest.create({ ...req.body, clientId: req.user.clientId });
    res.status(201).json(newABTest);
  } catch (error) {
    res.status(400).json({ message: 'Error creating AB test', error: error.message });
  }
};

exports.getABTest = async (req, res) => {
  try {
    const abTest = await ABTest.findOne({
      where: { id: req.params.id, clientId: req.user.clientId },
      include: [{ model: MenuItem }, { model: Client }]
    });
    if (abTest) {
      res.json(abTest);
    } else {
      res.status(404).json({ message: 'AB test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching AB test', error: error.message });
  }
};

exports.updateABTest = async (req, res) => {
  try {
    const [updated] = await ABTest.update(req.body, {
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (updated) {
      const updatedABTest = await ABTest.findOne({
        where: { id: req.params.id },
        include: [{ model: MenuItem }, { model: Client }]
      });
      res.json(updatedABTest);
    } else {
      res.status(404).json({ message: 'AB test not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating AB test', error: error.message });
  }
};

exports.deleteABTest = async (req, res) => {
  try {
    const deleted = await ABTest.destroy({
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'AB test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting AB test', error: error.message });
  }
};
