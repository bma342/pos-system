const { CateringOrderFees } = require('../models');

exports.getAllFees = async (req, res) => {
  try {
    const fees = await CateringOrderFees.findAll();
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering order fees', error: error.message });
  }
};

exports.createFee = async (req, res) => {
  try {
    const newFee = await CateringOrderFees.create(req.body);
    res.status(201).json(newFee);
  } catch (error) {
    res.status(400).json({ message: 'Error creating catering order fee', error: error.message });
  }
};

exports.getFee = async (req, res) => {
  try {
    const fee = await CateringOrderFees.findByPk(req.params.id);
    if (fee) {
      res.json(fee);
    } else {
      res.status(404).json({ message: 'Catering order fee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering order fee', error: error.message });
  }
};

exports.updateFee = async (req, res) => {
  try {
    const [updated] = await CateringOrderFees.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedFee = await CateringOrderFees.findByPk(req.params.id);
      res.json(updatedFee);
    } else {
      res.status(404).json({ message: 'Catering order fee not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating catering order fee', error: error.message });
  }
};

exports.deleteFee = async (req, res) => {
  try {
    const deleted = await CateringOrderFees.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Catering order fee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catering order fee', error: error.message });
  }
};
