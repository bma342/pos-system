const posConfigs = {
  brink: {
    format: 'XML',
    apiEndpoint: 'https://api.brinkpos.net/orders',
    inventoryEndpoint: 'https://api.brinkpos.net/inventory',
    contentType: 'application/xml',
  },
  toast: {
    format: 'JSON',
    apiEndpoint: 'https://api.toasttab.com/orders',
    inventoryEndpoint: 'https://api.toasttab.com/inventory',
    contentType: 'application/json',
  },
  revel: {
    format: 'JSON',
    apiEndpoint: 'https://api.revelsystems.com/orders',
    inventoryEndpoint: 'https://api.revelsystems.com/inventory',
    contentType: 'application/json',
  },
  square: {
    format: 'JSON',
    apiEndpoint: 'https://connect.squareup.com/v2/orders',
    inventoryEndpoint: 'https://connect.squareup.com/v2/inventory',
    contentType: 'application/json',
  },
};

module.exports = posConfigs;
