const CateringOrderCustomization = require('../models/CateringOrderCustomization');

exports.getAllCustomizations = async (req, res) => {
  try {
    const customizations = await CateringOrderCustomization.findAll();
    res.status(200).json(customizations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customizations', error: error.message });
  }
};

exports.getCustomizationById = async (req, res) => {
  try {
    const customization = await CateringOrderCustomization.findByPk(req.params.id);
    if (!customization) {
      return res.status(404).json({ message: 'Customization not found' });
    }
    res.status(200).json(customization);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customization', error: error.message });
  }
};

exports.createCustomization = async (req, res) => {
  try {
    const newCustomization = await CateringOrderCustomization.create(req.body);
    res.status(201).json(newCustomization);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customization', error: error.message });
  }
};

exports.updateCustomization = async (req, res) => {
  try {
    const [updated] = await CateringOrderCustomization.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCustomization = await CateringOrderCustomization.findByPk(req.params.id);
      res.status(200).json(updatedCustomization);
    } else {
      res.status(404).json({ message: 'Customization not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating customization', error: error.message });
  }
};

exports.deleteCustomization = async (req, res) => {
  try {
    const deleted = await CateringOrderCustomization.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Customization not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customization', error: error.message });
  }
};
