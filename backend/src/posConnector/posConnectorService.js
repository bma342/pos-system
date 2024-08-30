const axios = require('axios');
const TaxService = require('../services/taxService');
const logger = require('../services/logger');

class POSConnectorService {
  constructor(posConfig) {
    this.posConfig = posConfig;
  }

  async syncMenus(menuData) {
    try {
      const formattedData = this.posConfig.format === 'JSON' 
        ? this.syncToJSONPOS(menuData) 
        : this.syncToXMLPOS(menuData);

      const response = await this.makeRequest('post', this.posConfig.apiEndpoint, formattedData);
      logger.info(`Menu synced successfully with POS: ${this.posConfig.name}`);
      return response.data;
    } catch (error) {
      this.handleError('syncing menu', error);
    }
  }

  syncToJSONPOS(menuData) {
    return {
      menuName: menuData.name,
      items: menuData.menuItems.map(item => ({
        itemName: item.name,
        price: item.basePrice,
        pointsPrice: item.pointsPrice || null,
        modifiers: item.modifiers,
      })),
    };
  }

  syncToXMLPOS(menuData) {
    return `<Menu><Name>${menuData.name}</Name></Menu>`;
  }

  async sendOrderToPOS(orderData) {
    try {
      const response = await this.makeRequest('post', this.posConfig.apiEndpoint, orderData);
      logger.info(`Order sent successfully to POS: ${this.posConfig.name}`);
      return response.data;
    } catch (error) {
      this.handleError('sending order', error);
    }
  }

  async syncInventory(inventoryData) {
    try {
      const response = await this.makeRequest('post', this.posConfig.inventoryEndpoint, inventoryData);
      logger.info(`Inventory synced successfully with POS: ${this.posConfig.name}`);
      return response.data;
    } catch (error) {
      this.handleError('syncing inventory', error);
    }
  }

  async syncTaxRates(locationId, provider) {
    try {
      const taxDetails = await TaxService.getApplicableTax(locationId, provider);
      const response = await this.makeRequest('post', this.posConfig.taxEndpoint, taxDetails);
      logger.info(`Tax rates synced successfully with POS: ${this.posConfig.name}`);
      return response.data;
    } catch (error) {
      this.handleError('syncing tax rates', error);
    }
  }

  async makeRequest(method, url, data) {
    return axios({
      method,
      url,
      data,
      headers: { 'Content-Type': this.posConfig.contentType },
    });
  }

  handleError(operation, error) {
    logger.error(`Error ${operation} with POS ${this.posConfig.name}: ${error.message}`);
    throw error;
  }
}

module.exports = POSConnectorService;
