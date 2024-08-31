const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ClientFeatures extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ClientFeatures.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clients',
      key: 'id'
    }
  },
  featureName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  configuration: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  ClientFeatures.init(ClientFeatures.attributes, {
    sequelize,
    modelName: 'ClientFeatures',
    tableName: 'clientfeaturess', // Adjust this if needed
  });
  return ClientFeatures
};