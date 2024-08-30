const { CommissaryKitchen } = require('../models');
const logger = require('../services/logger');

exports.getAllCommissaryKitchens = async (req, res) => {
  try {
    const kitchens = await CommissaryKitchen.findAll();
    res.status(200).json(kitchens);
  } catch (error) {
    logger.error(`Error fetching commissary kitchens: ${error.message}`);
    res.status(500).json({ message: 'Error fetching commissary kitchens', error });
  }
};

exports.getCommissaryKitchenById = async (req, res) => {
  try {
    const kitchen = await CommissaryKitchen.findByPk(req.params.id);
    if (!kitchen) return res.status(404).json({ message: 'Commissary kitchen not found' });
    res.status(200).json(kitchen);
  } catch (error) {
    logger.error(`Error fetching commissary kitchen by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching commissary kitchen', error });
  }
};

exports.createCommissaryKitchen = async (req, res) => {
  try {
    const newKitchen = await CommissaryKitchen.create(req.body);
    logger.info(`Commissary kitchen created: ${newKitchen.id}`);
    res.status(201).json(newKitchen);
  } catch (error) {
    logger.error(`Error creating commissary kitchen: ${error.message}`);
    res.status(500).json({ message: 'Error creating commissary kitchen', error });
  }
};

exports.updateCommissaryKitchen = async (req, res) => {
  try {
    const [updated] = await CommissaryKitchen.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Commissary kitchen not found' });

    const updatedKitchen = await CommissaryKitchen.findByPk(req.params.id);
    logger.info(`Commissary kitchen updated: ${req.params.id}`);
    res.status(200).json(updatedKitchen);
  } catch (error) {
    logger.error(`Error updating commissary kitchen: ${error.message}`);
    res.status(500).json({ message: 'Error updating commissary kitchen', error });
  }
};

exports.deleteCommissaryKitchen = async (req, res) => {
  try {
    const deleted = await CommissaryKitchen.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Commissary kitchen not found' });

    logger.info(`Commissary kitchen deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting commissary kitchen: ${error.message}`);
    res.status(500).json({ message: 'Error deleting commissary kitchen', error });
  }
};
