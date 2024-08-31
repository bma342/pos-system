const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PosIntegration extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PosIntegration.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  posType: {
    type: DataTypes.STRING,
    allowNull: false
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
  lastSyncDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  PosIntegration.init(PosIntegration.attributes, {
    sequelize,
    modelName: 'PosIntegration',
    tableName: 'posintegrations', // Adjust this if needed
  });
  return PosIntegration
};