const { GuestReward } = require('../models');
const logger = require('../services/logger');

exports.getAllGuestRewards = async (req, res) => {
  try {
    const rewards = await GuestReward.findAll();
    res.status(200).json(rewards);
  } catch (error) {
    logger.error(`Error fetching guest rewards: ${error.message}`);
    res.status(500).json({ message: 'Error fetching guest rewards', error });
  }
};

exports.getGuestRewardById = async (req, res) => {
  try {
    const reward = await GuestReward.findByPk(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Guest reward not found' });
    res.status(200).json(reward);
  } catch (error) {
    logger.error(`Error fetching guest reward by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching guest reward', error });
  }
};

exports.createGuestReward = async (req, res) => {
  try {
    const newReward = await GuestReward.create(req.body);
    logger.info(`Guest reward created: ${newReward.id}`);
    res.status(201).json(newReward);
  } catch (error) {
    logger.error(`Error creating guest reward: ${error.message}`);
    res.status(500).json({ message: 'Error creating guest reward', error });
  }
};

exports.updateGuestReward = async (req, res) => {
  try {
    const [updated] = await GuestReward.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Guest reward not found' });

    const updatedReward = await GuestReward.findByPk(req.params.id);
    logger.info(`Guest reward updated: ${req.params.id}`);
    res.status(200).json(updatedReward);
  } catch (error) {
    logger.error(`Error updating guest reward: ${error.message}`);
    res.status(500).json({ message: 'Error updating guest reward', error });
  }
};

exports.deleteGuestReward = async (req, res) => {
  try {
    const deleted = await GuestReward.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Guest reward not found' });

    logger.info(`Guest reward deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting guest reward: ${error.message}`);
    res.status(500).json({ message: 'Error deleting guest reward', error });
  }
};
