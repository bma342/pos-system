const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CorePOSProfiles extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CorePOSProfiles.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  CorePOSProfiles.init(CorePOSProfiles.attributes, {
    sequelize,
    modelName: 'CorePOSProfiles',
    tableName: 'coreposprofiless', // Adjust this if needed
  });
  return CorePOSProfiles
};