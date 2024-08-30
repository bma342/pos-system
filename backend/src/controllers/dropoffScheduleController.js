const { DropoffSchedule } = require('../models');
const logger = require('../services/logger');

exports.getAllDropoffSchedules = async (req, res) => {
  try {
    const schedules = await DropoffSchedule.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    logger.error(`Error fetching drop-off schedules: ${error.message}`);
    res.status(500).json({ message: 'Error fetching drop-off schedules', error });
  }
};

exports.getDropoffScheduleById = async (req, res) => {
  try {
    const schedule = await DropoffSchedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Drop-off schedule not found' });
    res.status(200).json(schedule);
  } catch (error) {
    logger.error(`Error fetching drop-off schedule by ID (${req.params.id}): ${error.message}`);
    res.status(500).json({ message: 'Error fetching drop-off schedule', error });
  }
};

exports.createDropoffSchedule = async (req, res) => {
  try {
    const newSchedule = await DropoffSchedule.create(req.body);
    logger.info(`Drop-off schedule created: ${newSchedule.id}`);
    res.status(201).json(newSchedule);
  } catch (error) {
    logger.error(`Error creating drop-off schedule: ${error.message}`);
    res.status(500).json({ message: 'Error creating drop-off schedule', error });
  }
};

exports.updateDropoffSchedule = async (req, res) => {
  try {
    const [updated] = await DropoffSchedule.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Drop-off schedule not found' });

    const updatedSchedule = await DropoffSchedule.findByPk(req.params.id);
    logger.info(`Drop-off schedule updated: ${req.params.id}`);
    res.status(200).json(updatedSchedule);
  } catch (error) {
    logger.error(`Error updating drop-off schedule: ${error.message}`);
    res.status(500).json({ message: 'Error updating drop-off schedule', error });
  }
};

exports.deleteDropoffSchedule = async (req, res) => {
  try {
    const deleted = await DropoffSchedule.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Drop-off schedule not found' });

    logger.info(`Drop-off schedule deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting drop-off schedule: ${error.message}`);
    res.status(500).json({ message: 'Error deleting drop-off schedule', error });
  }
};
