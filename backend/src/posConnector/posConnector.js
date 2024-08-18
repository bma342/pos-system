const axios = require('axios');
const posConfigs = require('./posConfigs');

class POSConnectorService {
  constructor(posConfig) {
    this.posConfig = posConfig;
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
      const response = await axios.post(this.posConfig.apiEndpoint, orderData, {
        headers: { 'Content-Type': this.posConfig.contentType },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending order to POS:', error);
      throw error;
    }
  }

  async syncInventory(inventoryData) {
    try {
      const response = await axios.post(this.posConfig.inventoryEndpoint, inventoryData, {
        headers: { 'Content-Type': this.posConfig.contentType },
      });
      return response.data;
    } catch (error) {
      console.error('Error syncing inventory with POS:', error);
      throw error;
    }
  }
}

module.exports = POSConnectorService;
