const providerService = require('../services/providerService');
const logger = require('../services/logger');

// Fetch all providers for a client
exports.getProviders = async (req, res) => {
  try {
    const clientId = req.user.clientId;
    const providers = await providerService.getProviders(clientId);
    res.status(200).json(providers);
  } catch (error) {
    logger.error(`Error fetching providers for client ID ${req.user.clientId}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching providers', error });
  }
};

// Create a new provider
exports.createProvider = async (req, res) => {
  try {
    const providerData = req.body;
    const newProvider = await providerService.createProvider(req.user.clientId, providerData);
    logger.info(`Provider created: ${newProvider.name} for Client ID ${req.user.clientId}`);
    res.status(201).json(newProvider);
  } catch (error) {
    logger.error(`Error creating provider for Client ID ${req.user.clientId}: ${error.message}`);
    res.status(500).json({ message: 'Error creating provider', error });
  }
};

// Update an existing provider
exports.updateProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    const providerData = req.body;
    const updatedProvider = await providerService.updateProvider(providerId, providerData);
    logger.info(`Provider updated: ID ${providerId}`);
    res.status(200).json(updatedProvider);
  } catch (error) {
    logger.error(`Error updating provider (ID: ${providerId}): ${error.message}`);
    res.status(500).json({ message: 'Error updating provider', error });
  }
};

// Delete a provider
exports.deleteProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    await providerService.deleteProvider(providerId);
    logger.info(`Provider deleted: ID ${providerId}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting provider (ID: ${providerId}): ${error.message}`);
    res.status(500).json({ message: 'Error deleting provider', error });
  }
};

// Sync provider-specific data
exports.syncProviderData = async (req, res) => {
  try {
    const { providerId } = req.params;
    await providerService.syncProviderData(providerId);
    res.status(200).json({ message: 'Provider data synced successfully' });
  } catch (error) {
    logger.error(`Error syncing provider data (ID: ${providerId}): ${error.message}`);
    res.status(500).json({ message: 'Error syncing provider data', error });
  }
};

