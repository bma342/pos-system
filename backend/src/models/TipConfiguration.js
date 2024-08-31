const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class TipConfiguration extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

TipConfiguration.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  TipConfiguration.init(TipConfiguration.attributes, {
    sequelize,
    modelName: 'TipConfiguration',
    tableName: 'tipconfigurations', // Adjust this if needed
  });
  return TipConfiguration
};