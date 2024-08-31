const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Tip extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Tip.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  Tip.init(Tip.attributes, {
    sequelize,
    modelName: 'Tip',
    tableName: 'tips', // Adjust this if needed
  });
  return Tip
};