const db = require('../models');
const logger = require('../services/logger');
const providerIntegrationService = require('./providerIntegrationService');

class ProviderService {
  async getProviders(clientId) {
    try {
      return await db.Provider.findAll({ where: { clientId } });
    } catch (error) {
      logger.error(`Error fetching providers for Client ID ${clientId}: ${error.message}`);
      throw new Error('Error fetching providers');
    }
  }

  async createProvider(clientId, providerData) {
    try {
      return await db.Provider.create({ ...providerData, clientId });
    } catch (error) {
      logger.error(`Error creating provider for Client ID ${clientId}: ${error.message}`);
      throw new Error('Error creating provider');
    }
  }

  async updateProvider(providerId, providerData) {
    try {
      const provider = await db.Provider.findByPk(providerId);
      if (!provider) throw new Error('Provider not found');

      return await provider.update(providerData);
    } catch (error) {
      logger.error(`Error updating provider (ID: ${providerId}): ${error.message}`);
      throw new Error('Error updating provider');
    }
  }

  async deleteProvider(providerId) {
    try {
      const provider = await db.Provider.findByPk(providerId);
      if (!provider) throw new Error('Provider not found');

      await provider.destroy();
    } catch (error) {
      logger.error(`Error deleting provider (ID: ${providerId}): ${error.message}`);
      throw new Error('Error deleting provider');
    }
  }

  async syncProviderData(providerId) {
    try {
      const provider = await db.Provider.findByPk(providerId);
      if (!provider) throw new Error('Provider not found');

      // Trigger the provider integration sync
      await providerIntegrationService.syncData(provider);
      logger.info(`Provider data synced for Provider ID ${providerId}`);
    } catch (error) {
      logger.error(`Error syncing provider data (ID: ${providerId}): ${error.message}`);
      throw new Error('Error syncing provider data');
    }
  }
}

module.exports = new ProviderService();

