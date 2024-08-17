const axios = require('axios');

class POSConnectorService {
  constructor(posConfig) {
    this.posConfig = posConfig; // Each POS config will define how to interact with the POS system
  }

  // Function to sync menus with the external POS system
  syncMenus(menuData) {
    if (this.posConfig.format === 'JSON') {
      return this.syncToJSONPOS(menuData);
    } else if (this.posConfig.format === 'XML') {
      return this.syncToXMLPOS(menuData);
    }
    // Add more formats as needed
  }

  // Example function to sync with a JSON-based POS system
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

  // Example function to sync with an XML-based POS system (stubbed out for now)
  syncToXMLPOS(menuData) {
    // Implement XML syncing logic here
    return `<Menu><Name>${menuData.name}</Name></Menu>`;
  }

  // Function to send/confirm orders
  async sendOrderToPOS(orderData) {
    try {
      const response = await axios.post(this.posConfig.apiEndpoint, orderData, {
        headers: {
          'Content-Type': this.posConfig.contentType,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending order to POS:', error);
      throw error;
    }
  }

  // Function to sync inventory with the external POS system
  async syncInventory(inventoryData) {
    try {
      const response = await axios.post(this.posConfig.inventoryEndpoint, inventoryData, {
        headers: {
          'Content-Type': this.posConfig.contentType,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error syncing inventory with POS:', error);
      throw error;
    }
  }
}

module.exports = POSConnectorService;
