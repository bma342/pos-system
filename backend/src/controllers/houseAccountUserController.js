const { HouseAccountUser } = require('../models');
const logger = require('../services/logger');

exports.getAllHouseAccountUsers = async (req, res) => {
  try {
    const users = await HouseAccountUser.findAll();
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Error fetching house account users: ${error.message}`);
    res.status(500).json({ message: 'Error fetching house account users', error });
  }
};

exports.getHouseAccountUserById = async (req, res) => {
  try {
    const user = await HouseAccountUser.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'House account user not found' });
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching house account user by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching house account user', error });
  }
};

exports.createHouseAccountUser = async (req, res) => {
  try {
    const newUser = await HouseAccountUser.create(req.body);
    logger.info(`House account user created: ${newUser.id}`);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error(`Error creating house account user: ${error.message}`);
    res.status(500).json({ message: 'Error creating house account user', error });
  }
};

exports.updateHouseAccountUser = async (req, res) => {
  try {
    const [updated] = await HouseAccountUser.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'House account user not found' });

    const updatedUser = await HouseAccountUser.findByPk(req.params.id);
    logger.info(`House account user updated: ${req.params.id}`);
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(`Error updating house account user: ${error.message}`);
    res.status(500).json({ message: 'Error updating house account user', error });
  }
};

exports.deleteHouseAccountUser = async (req, res) => {
  try {
    const deleted = await HouseAccountUser.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'House account user not found' });

    logger.info(`House account user deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting house account user: ${error.message}`);
    res.status(500).json({ message: 'Error deleting house account user', error });
  }
};
