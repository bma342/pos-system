const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { clientId: req.user.clientId } });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create({ ...req.body, clientId: req.user.clientId });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ 
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (updated) {
      const updatedCategory = await Category.findOne({ 
        where: { id: req.params.id, clientId: req.user.clientId }
      });
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};
