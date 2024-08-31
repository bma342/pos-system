const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PosIntegrationSettings extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PosIntegrationSettings.attributes = attributes = {
  posIntegrationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'PosIntegrations', key: 'id' }
  },
  syncFrequency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60, // in minutes
    comment: 'How often to sync with POS system in minutes'
  },
  autoSync: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  syncItems: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  syncCategories: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  syncModifiers: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  syncOrders: {
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
  PosIntegrationSettings.init(PosIntegrationSettings.attributes, {
    sequelize,
    modelName: 'PosIntegrationSettings',
    tableName: 'posintegrationsettingss', // Adjust this if needed
  });
  return PosIntegrationSettings
};