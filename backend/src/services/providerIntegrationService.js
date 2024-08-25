const axios = require('axios');
const logger = require('./logger');

class ProviderIntegrationService {
  async syncData(provider) {
    try {
      const apiSettings = provider.apiSettings;
      const response = await axios.post(`${apiSettings.baseUrl}/sync`, {}, {
        headers: {
          Authorization: `Bearer ${apiSettings.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        logger.info(`Provider data synced successfully for provider ${provider.name}`);
      } else {
        logger.error(`Provider data sync failed: ${response.data.message}`);
      }
    } catch (error) {
      logger.error(`Error syncing provider data: ${error.message}`);
      throw new Error('Error syncing provider data');
    }
  }
}

module.exports = new ProviderIntegrationService();
