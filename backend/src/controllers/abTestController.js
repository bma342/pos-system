const { validationResult } = require('express-validator');
const abTestService = require('../services/abTestService');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errorHandler');

const validateRequest = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, errors.array());
  }
};

const createABTest = async (req, res, next) => {
  try {
    validateRequest(req);
    const abTest = await abTestService.createABTest(req.body);
    logger.info(`A/B Test created with ID: ${abTest.id}`);
    res.status(201).json(abTest);
  } catch (error) {
    logger.error('Error creating A/B Test:', error);
    next(error);
  }
};

const getABTest = async (req, res, next) => {
  try {
    const abTest = await abTestService.getABTest(req.params.id);
    if (!abTest) {
      throw new AppError('A/B Test not found', 404);
    }
    res.json(abTest);
  } catch (error) {
    logger.error(`Error fetching A/B Test with ID ${req.params.id}:`, error);
    next(error);
  }
};

const updateABTest = async (req, res, next) => {
  try {
    validateRequest(req);
    const updatedABTest = await abTestService.updateABTest(req.params.id, req.body);
    logger.info(`A/B Test updated with ID: ${req.params.id}`);
    res.json(updatedABTest);
  } catch (error) {
    logger.error(`Error updating A/B Test with ID ${req.params.id}:`, error);
    next(error);
  }
};

const deleteABTest = async (req, res, next) => {
  try {
    await abTestService.deleteABTest(req.params.id);
    logger.info(`A/B Test deleted with ID: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting A/B Test with ID ${req.params.id}:`, error);
    next(error);
  }
};

const getABTestResults = async (req, res, next) => {
  try {
    const results = await abTestService.getABTestResults(req.params.id);
    res.json(results);
  } catch (error) {
    logger.error(`Error fetching A/B Test results for ID ${req.params.id}:`, error);
    next(error);
  }
};

const startABTest = async (req, res, next) => {
  try {
    const startedTest = await abTestService.startABTest(req.params.id);
    logger.info(`A/B Test started with ID: ${req.params.id}`);
    res.json(startedTest);
  } catch (error) {
    logger.error(`Error starting A/B Test with ID ${req.params.id}:`, error);
    next(error);
  }
};

const stopABTest = async (req, res, next) => {
  try {
    const stoppedTest = await abTestService.stopABTest(req.params.id);
    logger.info(`A/B Test stopped with ID: ${req.params.id}`);
    res.json(stoppedTest);
  } catch (error) {
    logger.error(`Error stopping A/B Test with ID ${req.params.id}:`, error);
    next(error);
  }
};

module.exports = {
  createABTest,
  getABTest,
  updateABTest,
  deleteABTest,
  getABTestResults,
  startABTest,
  stopABTest
};