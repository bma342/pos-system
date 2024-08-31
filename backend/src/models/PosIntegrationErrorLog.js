const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PosIntegrationErrorLog extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PosIntegrationErrorLog.attributes = attributes = {
  posIntegrationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'PosIntegrations', key: 'id' }
  },
  errorType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  errorMessage: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  errorDetails: {
    type: DataTypes.JSON,
    allowNull: true
  },
  occurredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  resolved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  resolvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  resolutionNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  PosIntegrationErrorLog.init(PosIntegrationErrorLog.attributes, {
    sequelize,
    modelName: 'PosIntegrationErrorLog',
    tableName: 'posintegrationerrorlogs', // Adjust this if needed
  });
  return PosIntegrationErrorLog
};