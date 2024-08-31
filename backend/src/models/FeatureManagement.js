const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class FeatureManagement extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

FeatureManagement.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
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
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  FeatureManagement.init(FeatureManagement.attributes, {
    sequelize,
    modelName: 'FeatureManagement',
    tableName: 'featuremanagements', // Adjust this if needed
  });
  return FeatureManagement
};