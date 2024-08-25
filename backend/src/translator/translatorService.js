const axios = require('axios');

class TranslatorService {
  constructor(providerConfig) {
    this.providerConfig = providerConfig; // Each provider's config defines how to format the data
  }

  // Function to translate menu data
  translateMenu(menuData) {
    if (this.providerConfig.format === 'JSON') {
      return this.translateToJSON(menuData);
    } else if (this.providerConfig.format === 'XML') {
      return this.translateToXML(menuData);
    }
    // Add more formats as needed
  }

  // Example function to translate to JSON format
  translateToJSON(menuData) {
    return {
      menuName: menuData.name,
      items: menuData.menuItems.map(item => ({
        itemName: item.name,
        price: item.basePrice,
        pointsPrice: item.pointsPrice || null, // Handling points if applicable
        modifiers: item.modifiers,
      })),
    };
  }

  // Example function to translate to XML format (stubbed out for now)
  translateToXML(menuData) {
    // Implement XML translation logic here
    return `<Menu><Name>${menuData.name}</Name></Menu>`;
  }

  // Send the translated data to the provider's API
  async sendDataToProvider(translatedData) {
    try {
      const response = await axios.post(this.providerConfig.apiEndpoint, translatedData, {
        headers: {
          'Content-Type': this.providerConfig.contentType,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending data to provider:', error);
      throw error;
    }
  }
}

module.exports = TranslatorService;
