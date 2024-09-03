const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LocationPOSProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LocationPOSProfile.attributes = attributes = {
  locationId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  corePOSProfileId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'core_pos_profiles',
      key: 'id',
    },
  },
  lastSyncStatus: {
    type: DataTypes.ENUM('SUCCESS', 'FAILED', 'IN_PROGRESS', 'NOT_SYNCED'),
    defaultValue: 'NOT_SYNCED',
  },
  lastSyncError: {
    type: DataTypes.STRING,
  },
  customSettings: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
};

module.exports = (sequelize) => {
  LocationPOSProfile.init(LocationPOSProfile.attributes, {
    sequelize,
    modelName: 'LocationPOSProfile',
    tableName: 'location_pos_profiles', // Adjust this if needed
  });
  return LocationPOSProfile
};