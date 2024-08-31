const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class checkModels extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

checkModels.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  checkModels.init(checkModels.attributes, {
    sequelize,
    modelName: 'checkModels',
    tableName: 'checkmodelss', // Adjust this if needed
  });
  return checkModels
};