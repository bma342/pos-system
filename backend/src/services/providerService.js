const { Provider, ProviderSettings, ProviderIntegration } = require('../models');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

const getAllProviders = async (clientId) => {
  try {
    return await Provider.findAll({ where: { clientId } });
  } catch (error) {
    logger.error('Error fetching all providers:', error);
    throw new AppError('Failed to fetch providers', 500);
  }
};

const getProviderById = async (id) => {
  try {
    const provider = await Provider.findByPk(id);
    if (!provider) {
      throw new AppError('Provider not found', 404);
    }
    return provider;
  } catch (error) {
    logger.error(`Error fetching provider with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch provider', 500);
  }
};

const createProvider = async (providerData) => {
  try {
    const newProvider = await Provider.create(providerData);
    logger.info(`New provider created with ID: ${newProvider.id}`);
    return newProvider;
  } catch (error) {
    logger.error('Error creating provider:', error);
    throw new AppError('Failed to create provider', 500);
  }
};

const updateProvider = async (id, providerData) => {
  try {
    const provider = await getProviderById(id);
    const updatedProvider = await provider.update(providerData);
    logger.info(`Provider updated with ID: ${id}`);
    return updatedProvider;
  } catch (error) {
    logger.error(`Error updating provider with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update provider', 500);
  }
};

const deleteProvider = async (id) => {
  try {
    const provider = await getProviderById(id);
    await provider.destroy();
    logger.info(`Provider deleted with ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting provider with ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete provider', 500);
  }
};

const syncProviderData = async (id) => {
  try {
    const provider = await getProviderById(id);
    // Implement provider-specific sync logic here
    logger.info(`Provider data synced for ID: ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error syncing provider data for ID ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to sync provider data', 500);
  }
};

const getProviderSettings = async (id) => {
  try {
    const settings = await ProviderSettings.findOne({ where: { providerId: id } });
    if (!settings) {
      throw new AppError('Provider settings not found', 404);
    }
    return settings;
  } catch (error) {
    logger.error(`Error fetching settings for provider ${id}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to fetch provider settings', 500);
  }
};

const updateProviderSettings = async (id, settingsData) => {
  try {
    const [settings, created] = await ProviderSettings.findOrCreate({
      where: { providerId: id },
      defaults: settingsData
    });
    if (!created) {
      await settings.update(settingsData);
    }
    logger.info(`Provider settings updated for ID: ${id}`);
    return settings;
  } catch (error) {
    logger.error(`Error updating settings for provider ${id}:`, error);
    throw new AppError('Failed to update provider settings', 500);
  }
};

const getProviderIntegrations = async (id) => {
  try {
    return await ProviderIntegration.findAll({ where: { providerId: id } });
  } catch (error) {
    logger.error(`Error fetching integrations for provider ${id}:`, error);
    throw new AppError('Failed to fetch provider integrations', 500);
  }
};

const addProviderIntegration = async (id, integrationData) => {
  try {
    const newIntegration = await ProviderIntegration.create({ ...integrationData, providerId: id });
    logger.info(`New integration added for provider ID: ${id}`);
    return newIntegration;
  } catch (error) {
    logger.error(`Error adding integration for provider ${id}:`, error);
    throw new AppError('Failed to add provider integration', 500);
  }
};

const updateProviderIntegration = async (providerId, integrationId, integrationData) => {
  try {
    const integration = await ProviderIntegration.findOne({
      where: { id: integrationId, providerId }
    });
    if (!integration) {
      throw new AppError('Provider integration not found', 404);
    }
    const updatedIntegration = await integration.update(integrationData);
    logger.info(`Integration updated for provider ID: ${providerId}, integration ID: ${integrationId}`);
    return updatedIntegration;
  } catch (error) {
    logger.error(`Error updating integration ${integrationId} for provider ${providerId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to update provider integration', 500);
  }
};

const deleteProviderIntegration = async (providerId, integrationId) => {
  try {
    const integration = await ProviderIntegration.findOne({
      where: { id: integrationId, providerId }
    });
    if (!integration) {
      throw new AppError('Provider integration not found', 404);
    }
    await integration.destroy();
    logger.info(`Integration deleted for provider ID: ${providerId}, integration ID: ${integrationId}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting integration ${integrationId} for provider ${providerId}:`, error);
    throw error instanceof AppError ? error : new AppError('Failed to delete provider integration', 500);
  }
};

module.exports = {
  getAllProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
  syncProviderData,
  getProviderSettings,
  updateProviderSettings,
  getProviderIntegrations,
  addProviderIntegration,
  updateProviderIntegration,
  deleteProviderIntegration
};

