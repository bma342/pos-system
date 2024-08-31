const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class POSSettings extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

POSSettings.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  posType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apiEndpoint: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apiSecret: {
    type: DataTypes.STRING,
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
  POSSettings.init(POSSettings.attributes, {
    sequelize,
    modelName: 'POSSettings',
    tableName: 'possettingss', // Adjust this if needed
  });
  return POSSettings
};