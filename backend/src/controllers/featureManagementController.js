const featureManagementService = require('../services/featureManagementService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getClientFeatures = async (req, res, next) => {
  try {
    const features = await featureManagementService.getClientFeatures(req.params.clientId);
    res.status(200).json(features);
  } catch (error) {
    logger.error(`Error fetching features for client ${req.params.clientId}:`, error);
    next(new AppError('Error fetching client features', 500));
  }
};

const updateClientFeatures = async (req, res, next) => {
  try {
    const updatedFeatures = await featureManagementService.updateClientFeatures(req.params.clientId, req.body);
    res.status(200).json(updatedFeatures);
  } catch (error) {
    logger.error(`Error updating features for client ${req.params.clientId}:`, error);
    next(new AppError('Error updating client features', 500));
  }
};

const getAllAvailableFeatures = async (req, res, next) => {
  try {
    const features = await featureManagementService.getAllAvailableFeatures();
    res.status(200).json(features);
  } catch (error) {
    logger.error('Error fetching all available features:', error);
    next(new AppError('Error fetching available features', 500));
  }
};

const createFeature = async (req, res, next) => {
  try {
    const newFeature = await featureManagementService.createFeature(req.body);
    res.status(201).json(newFeature);
  } catch (error) {
    logger.error('Error creating new feature:', error);
    next(new AppError('Error creating feature', 500));
  }
};

const updateFeature = async (req, res, next) => {
  try {
    const updatedFeature = await featureManagementService.updateFeature(req.params.featureId, req.body);
    res.status(200).json(updatedFeature);
  } catch (error) {
    logger.error(`Error updating feature ${req.params.featureId}:`, error);
    next(new AppError('Error updating feature', 500));
  }
};

const deleteFeature = async (req, res, next) => {
  try {
    await featureManagementService.deleteFeature(req.params.featureId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting feature ${req.params.featureId}:`, error);
    next(new AppError('Error deleting feature', 500));
  }
};

module.exports = {
  getClientFeatures,
  updateClientFeatures,
  getAllAvailableFeatures,
  createFeature,
  updateFeature,
  deleteFeature
};
