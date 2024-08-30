const { CateringOrderItem } = require('../models');

exports.getAllItems = async (req, res) => {
  try {
    const items = await CateringOrderItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering order items', error: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const newItem = await CateringOrderItem.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating catering order item', error: error.message });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await CateringOrderItem.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Catering order item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching catering order item', error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const [updated] = await CateringOrderItem.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedItem = await CateringOrderItem.findByPk(req.params.id);
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Catering order item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating catering order item', error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deleted = await CateringOrderItem.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Catering order item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting catering order item', error: error.message });
  }
};
