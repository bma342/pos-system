// Define the configurations for each POS system
const posConfigs = {
  par: {
    apiKey: 'PAR_API_KEY',
    apiUrl: 'https://par-pos-system.com/api',
    // Add any additional config details specific to PAR
  },
  brink: {
    apiKey: 'BRINK_API_KEY',
    apiUrl: 'https://brink-pos-system.com/api',
    // Add any additional config details specific to Brink
  },
  toast: {
    apiKey: 'TOAST_API_KEY',
    apiUrl: 'https://toast-pos-system.com/api',
    // Add any additional config details specific to Toast
  },
};

// Define the POS profiles for different locations
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

module.exports = posProfiles;
