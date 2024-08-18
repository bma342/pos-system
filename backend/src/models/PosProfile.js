const posConfigs = {
  par: {
    format: 'JSON',
    apiEndpoint: 'https://api.par.com/orders',
    inventoryEndpoint: 'https://api.par.com/inventory',
    contentType: 'application/json',
  },
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
  // Add more POS systems as needed
};

const posProfiles = {
  location1: {
    posSystem: 'par',
    locationId: 1,
    posConfig: posConfigs.par,
  },
  location2: {
    posSystem: 'brink',
    locationId: 2,
    posConfig: posConfigs.brink,
  },
  location3: {
    posSystem: 'toast',
    locationId: 3,
    posConfig: posConfigs.toast,
  },
  // Add more locations as needed
};

module.exports = { posConfigs, posProfiles };
