const { ABTestResult, Modifier, MenuItem } = require('../models');

exports.getAllABTestResults = async (req, res) => {
  try {
    const abTestResults = await ABTestResult.findAll({
      include: [{ model: Modifier }, { model: MenuItem }]
    });
    res.json(abTestResults);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching AB test results', error: error.message });
  }
};

exports.createABTestResult = async (req, res) => {
  try {
    const newABTestResult = await ABTestResult.create(req.body);
    res.status(201).json(newABTestResult);
  } catch (error) {
    res.status(400).json({ message: 'Error creating AB test result', error: error.message });
  }
};

exports.getABTestResult = async (req, res) => {
  try {
    const abTestResult = await ABTestResult.findByPk(req.params.id, {
      include: [{ model: Modifier }, { model: MenuItem }]
    });
    if (abTestResult) {
      res.json(abTestResult);
    } else {
      res.status(404).json({ message: 'AB test result not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching AB test result', error: error.message });
  }
};

exports.updateABTestResult = async (req, res) => {
  try {
    const [updated] = await ABTestResult.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedABTestResult = await ABTestResult.findByPk(req.params.id, {
        include: [{ model: Modifier }, { model: MenuItem }]
      });
      res.json(updatedABTestResult);
    } else {
      res.status(404).json({ message: 'AB test result not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating AB test result', error: error.message });
  }
};

exports.deleteABTestResult = async (req, res) => {
  try {
    const deleted = await ABTestResult.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'AB test result not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting AB test result', error: error.message });
  }
};
