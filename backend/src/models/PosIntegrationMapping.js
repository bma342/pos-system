const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PosIntegrationMapping extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PosIntegrationMapping.attributes = attributes = {
  posIntegrationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'PosIntegrations', key: 'id' }
  },
  entityType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  localId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  externalId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mappingData: {
    type: DataTypes.JSON,
    allowNull: true
  },
  lastSyncDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  PosIntegrationMapping.init(PosIntegrationMapping.attributes, {
    sequelize,
    modelName: 'PosIntegrationMapping',
    tableName: 'posintegrationmappings', // Adjust this if needed
  });
  return PosIntegrationMapping
};