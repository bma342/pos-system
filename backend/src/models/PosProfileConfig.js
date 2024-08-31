const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PosProfileConfig extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PosProfileConfig.attributes = attributes = {
  posProfileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'PosProfiles', key: 'id' }
  },
  syncFrequency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60, // in minutes
  },
  autoSync: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  menuSyncEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  orderSyncEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  customerSyncEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  customConfig: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  PosProfileConfig.init(PosProfileConfig.attributes, {
    sequelize,
    modelName: 'PosProfileConfig',
    tableName: 'posprofileconfigs', // Adjust this if needed
  });
  return PosProfileConfig
};