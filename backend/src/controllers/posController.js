const posService = require('../services/posService');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errorHandler');
const { validationResult } = require('express-validator');

const handleErrors = (req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation error', 400, errors.array()));
  }
};

const createProfile = async (req, res, next) => {
  try {
    handleErrors(req, next);
    const profile = await posService.createProfile(req.body);
    logger.info(`POS profile created: ${profile.id}`);
    res.status(201).json(profile);
  } catch (error) {
    logger.error('Error creating POS profile:', error);
    next(new AppError('Error creating POS profile', 500));
  }
};

const getProfile = async (req, res, next) => {
  try {
    const profile = await posService.getProfile(req.params.id);
    if (!profile) {
      return next(new AppError('POS profile not found', 404));
    }
    res.json(profile);
  } catch (error) {
    logger.error(`Error fetching POS profile ${req.params.id}:`, error);
    next(new AppError('Error fetching POS profile', 500));
  }
};

const updateProfile = async (req, res, next) => {
  try {
    handleErrors(req, next);
    const updatedProfile = await posService.updateProfile(req.params.id, req.body);
    logger.info(`POS profile updated: ${req.params.id}`);
    res.json(updatedProfile);
  } catch (error) {
    logger.error(`Error updating POS profile ${req.params.id}:`, error);
    next(new AppError('Error updating POS profile', 500));
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    await posService.deleteProfile(req.params.id);
    logger.info(`POS profile deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting POS profile ${req.params.id}:`, error);
    next(new AppError('Error deleting POS profile', 500));
  }
};

const syncData = async (req, res, next) => {
  try {
    handleErrors(req, next);
    const result = await posService.syncData(req.body);
    logger.info('POS data synced successfully');
    res.json(result);
  } catch (error) {
    logger.error('Error syncing POS data:', error);
    next(new AppError('Error syncing POS data', 500));
  }
};

const getStatus = async (req, res, next) => {
  try {
    const status = await posService.getStatus(req.params.id);
    res.json(status);
  } catch (error) {
    logger.error(`Error fetching POS status ${req.params.id}:`, error);
    next(new AppError('Error fetching POS status', 500));
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  syncData,
  getStatus
};