const { Feature, ClientFeature } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getClientFeatures = async (clientId) => {
  try {
    const clientFeatures = await ClientFeature.findAll({
      where: { clientId },
      include: [{ model: Feature, attributes: ['name', 'description'] }]
    });
    return clientFeatures;
  } catch (error) {
    logger.error(`Error fetching features for client ${clientId}:`, error);
    throw new AppError('Failed to fetch client features', 500);
  }
};

const updateClientFeatures = async (clientId, featureUpdates) => {
  try {
    const updatedFeatures = await Promise.all(
      featureUpdates.map(async (update) => {
        const [clientFeature, created] = await ClientFeature.findOrCreate({
          where: { clientId, featureId: update.featureId },
          defaults: { isEnabled: update.isEnabled }
        });
        if (!created) {
          await clientFeature.update({ isEnabled: update.isEnabled });
        }
        return clientFeature;
      })
    );
    return updatedFeatures;
  } catch (error) {
    logger.error(`Error updating features for client ${clientId}:`, error);
    throw new AppError('Failed to update client features', 500);
  }
};

const getAllAvailableFeatures = async () => {
  try {
    return await Feature.findAll();
  } catch (error) {
    logger.error('Error fetching all available features:', error);
    throw new AppError('Failed to fetch available features', 500);
  }
};

const createFeature = async (featureData) => {
  try {
    const newFeature = await Feature.create(featureData);
    logger.info(`New feature created with ID: ${newFeature.id}`);
    return newFeature;
  } catch (error) {
    logger.error('Error creating new feature:', error);
    throw new AppError('Failed to create feature', 500);
  }
};

const updateFeature = async (featureId, featureData) => {
  try {
    const feature = await Feature.findByPk(featureId);
    if (!feature) {
      throw new AppError('Feature not found', 404);
    }
    const updatedFeature = await feature.update(featureData);
    return updatedFeature;
  } catch (error) {
    logger.error(`Error updating feature ${featureId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update feature', 500);
  }
};

const deleteFeature = async (featureId) => {
  try {
    const feature = await Feature.findByPk(featureId);
    if (!feature) {
      throw new AppError('Feature not found', 404);
    }
    await feature.destroy();
    logger.info(`Feature deleted with ID: ${featureId}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting feature ${featureId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete feature', 500);
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