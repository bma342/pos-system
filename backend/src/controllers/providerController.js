const providerService = require('../services/providerService');
const { AppError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// Fetch all providers for a client
exports.getAllProviders = async (req, res, next) => {
  try {
    const providers = await providerService.getAllProviders(req.user.clientId);
    res.status(200).json(providers);
  } catch (error) {
    logger.error('Error fetching all providers:', error);
    next(new AppError('Failed to fetch providers', 500));
  }
};

// Get a provider by ID
exports.getProviderById = async (req, res, next) => {
  try {
    const provider = await providerService.getProviderById(req.params.id);
    if (!provider) {
      return next(new AppError('Provider not found', 404));
    }
    res.status(200).json(provider);
  } catch (error) {
    logger.error(`Error fetching provider ${req.params.id}:`, error);
    next(error);
  }
};

// Create a new provider
exports.createProvider = async (req, res, next) => {
  try {
    const newProvider = await providerService.createProvider(req.body);
    res.status(201).json(newProvider);
  } catch (error) {
    logger.error('Error creating provider:', error);
    next(error);
  }
};

// Update an existing provider
exports.updateProvider = async (req, res, next) => {
  try {
    const updatedProvider = await providerService.updateProvider(req.params.id, req.body);
    if (!updatedProvider) {
      return next(new AppError('Provider not found', 404));
    }
    res.status(200).json(updatedProvider);
  } catch (error) {
    logger.error(`Error updating provider ${req.params.id}:`, error);
    next(error);
  }
};

// Delete a provider
exports.deleteProvider = async (req, res, next) => {
  try {
    const result = await providerService.deleteProvider(req.params.id);
    if (!result) {
      return next(new AppError('Provider not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting provider ${req.params.id}:`, error);
    next(error);
  }
};

// Sync provider-specific data
exports.syncProviderData = async (req, res, next) => {
  try {
    await providerService.syncProviderData(req.params.id);
    res.status(200).json({ message: 'Provider data synced successfully' });
  } catch (error) {
    logger.error(`Error syncing provider data (ID: ${req.params.id}):`, error);
    next(new AppError('Error syncing provider data', 500));
  }
};

// Get provider settings
exports.getProviderSettings = async (req, res, next) => {
  try {
    const settings = await providerService.getProviderSettings(req.params.id);
    res.status(200).json(settings);
  } catch (error) {
    logger.error(`Error fetching settings for provider ${req.params.id}:`, error);
    next(error);
  }
};

// Update provider settings
exports.updateProviderSettings = async (req, res, next) => {
  try {
    const updatedSettings = await providerService.updateProviderSettings(req.params.id, req.body);
    res.status(200).json(updatedSettings);
  } catch (error) {
    logger.error(`Error updating settings for provider ${req.params.id}:`, error);
    next(error);
  }
};

// Get provider integrations
exports.getProviderIntegrations = async (req, res, next) => {
  try {
    const integrations = await providerService.getProviderIntegrations(req.params.id);
    res.status(200).json(integrations);
  } catch (error) {
    logger.error(`Error fetching integrations for provider ${req.params.id}:`, error);
    next(error);
  }
};

// Add provider integration
exports.addProviderIntegration = async (req, res, next) => {
  try {
    const newIntegration = await providerService.addProviderIntegration(req.params.id, req.body);
    res.status(201).json(newIntegration);
  } catch (error) {
    logger.error(`Error adding integration for provider ${req.params.id}:`, error);
    next(error);
  }
};

// Update provider integration
exports.updateProviderIntegration = async (req, res, next) => {
  try {
    const updatedIntegration = await providerService.updateProviderIntegration(req.params.id, req.params.integrationId, req.body);
    res.status(200).json(updatedIntegration);
  } catch (error) {
    logger.error(`Error updating integration ${req.params.integrationId} for provider ${req.params.id}:`, error);
    next(error);
  }
};

// Delete provider integration
exports.deleteProviderIntegration = async (req, res, next) => {
  try {
    await providerService.deleteProviderIntegration(req.params.id, req.params.integrationId);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting integration ${req.params.integrationId} for provider ${req.params.id}:`, error);
    next(error);
  }
};
