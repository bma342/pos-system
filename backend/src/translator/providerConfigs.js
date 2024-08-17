const providerConfigs = {
  doordash: {
    format: 'JSON',
    apiEndpoint: 'https://api.doordash.com/menus',
    contentType: 'application/json',
  },
  ubereats: {
    format: 'XML',
    apiEndpoint: 'https://api.ubereats.com/menus',
    contentType: 'application/xml',
  },
  // Add more providers as needed
};

module.exports = providerConfigs;
