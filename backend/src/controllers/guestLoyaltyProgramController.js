const { GuestLoyaltyProgram } = require('../models');
const logger = require('../services/logger');

exports.getAllLoyaltyPrograms = async (req, res) => {
  try {
    const programs = await GuestLoyaltyProgram.findAll();
    res.status(200).json(programs);
  } catch (error) {
    logger.error(`Error fetching loyalty programs: ${error.message}`);
    res.status(500).json({ message: 'Error fetching loyalty programs', error });
  }
};

exports.getLoyaltyProgramById = async (req, res) => {
  try {
    const program = await GuestLoyaltyProgram.findByPk(req.params.id);
    if (!program) return res.status(404).json({ message: 'Loyalty program not found' });
    res.status(200).json(program);
  } catch (error) {
    logger.error(`Error fetching loyalty program by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching loyalty program', error });
  }
};

exports.createLoyaltyProgram = async (req, res) => {
  try {
    const newProgram = await GuestLoyaltyProgram.create(req.body);
    logger.info(`Loyalty program created: ${newProgram.id}`);
    res.status(201).json(newProgram);
  } catch (error) {
    logger.error(`Error creating loyalty program: ${error.message}`);
    res.status(500).json({ message: 'Error creating loyalty program', error });
  }
};

exports.updateLoyaltyProgram = async (req, res) => {
  try {
    const [updated] = await GuestLoyaltyProgram.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Loyalty program not found' });

    const updatedProgram = await GuestLoyaltyProgram.findByPk(req.params.id);
    logger.info(`Loyalty program updated: ${req.params.id}`);
    res.status(200).json(updatedProgram);
  } catch (error) {
    logger.error(`Error updating loyalty program: ${error.message}`);
    res.status(500).json({ message: 'Error updating loyalty program', error });
  }
};

exports.deleteLoyaltyProgram = async (req, res) => {
  try {
    const deleted = await GuestLoyaltyProgram.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Loyalty program not found' });

    logger.info(`Loyalty program deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting loyalty program: ${error.message}`);
    res.status(500).json({ message: 'Error deleting loyalty program', error });
  }
};
