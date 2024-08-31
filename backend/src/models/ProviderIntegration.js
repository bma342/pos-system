const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ProviderIntegration extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ProviderIntegration.attributes = attributes = {
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Providers', key: 'id' }
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apiSecret: {
    type: DataTypes.STRING,
    allowNull: true
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tokenExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true
  },
  lastSyncDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  ProviderIntegration.init(ProviderIntegration.attributes, {
    sequelize,
    modelName: 'ProviderIntegration',
    tableName: 'providerintegrations', // Adjust this if needed
  });
  return ProviderIntegration
};