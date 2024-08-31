const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LocationPOSProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LocationPOSProfile.attributes = attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  posProfileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'POSProfiles', key: 'id' }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  customSettings: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LocationPOSProfile.init(LocationPOSProfile.attributes, {
    sequelize,
    modelName: 'LocationPOSProfile',
    tableName: 'locationposprofiles', // Adjust this if needed
  });
  return LocationPOSProfile
};