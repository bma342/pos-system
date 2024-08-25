const posConfigs = require('./posConfigs');

const posProfiles = {
  location1: {
    posSystem: 'brink',
    locationId: 1,
    posConfig: posConfigs.brink,
  },
  location2: {
    posSystem: 'toast',
    locationId: 2,
    posConfig: posConfigs.toast,
  },
  location3: {
    posSystem: 'revel',
    locationId: 3,
    posConfig: posConfigs.revel,
  },
  location4: {
    posSystem: 'square',
    locationId: 4,
    posConfig: posConfigs.square,
  },
  // Add more locations as needed
};

module.exports = posProfiles;
