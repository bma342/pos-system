const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Provider extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Provider.attributes = attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('delivery', 'pos', 'payment', 'other'),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  apiEndpoint: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apiVersion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  supportContact: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Provider.init(Provider.attributes, {
    sequelize,
    modelName: 'Provider',
    tableName: 'providers', // Adjust this if needed
  });
  return Provider
};