const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Analytics extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Analytics.attributes = attributes = {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  metric: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  // Add other attributes as needed
};

module.exports = (sequelize) => {
  Analytics.init(Analytics.attributes, {
    sequelize,
    modelName: 'Analytics',
    tableName: 'analyticss', // Adjust this if needed
  });
  return Analytics
};