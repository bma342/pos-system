const axios = require('axios');
const posConfigs = require('./posConfigs');
const logger = require('../services/logger');

class POSConnectorService {
  constructor(posConfig) {
    this.posConfig = posConfig;
    this.defaultConfig = posConfigs[posConfig.provider] || {};
  }

  syncMenus(menuData) {
    if (this.posConfig.format === 'JSON') {
      return this.syncToJSONPOS(menuData);
    } else if (this.posConfig.format === 'XML') {
      return this.syncToXMLPOS(menuData);
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
      const endpoint = this.posConfig.apiEndpoint || this.defaultConfig.apiEndpoint;
      const response = await axios.post(endpoint, orderData, {
        headers: { 'Content-Type': this.posConfig.contentType || this.defaultConfig.contentType },
      });
      logger.info(`Order sent successfully to POS: ${this.posConfig.name}`);
      return response.data;
    } catch (error) {
      logger.error(`Error sending order to POS ${this.posConfig.name}: ${error.message}`);
      throw error;
    }
  }

  async syncInventory(inventoryData) {
    try {
      const endpoint = this.posConfig.inventoryEndpoint || this.defaultConfig.inventoryEndpoint;
      const response = await axios.post(endpoint, inventoryData, {
        headers: { 'Content-Type': this.posConfig.contentType || this.defaultConfig.contentType },
      });
      logger.info(`Inventory synced successfully with POS: ${this.posConfig.name}`);
      return response.data;
    } catch (error) {
      logger.error(`Error syncing inventory with POS ${this.posConfig.name}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = POSConnectorService;
