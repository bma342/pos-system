const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ModelName extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ModelName.attributes = attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  ModelName.init(ModelName.attributes, {
    sequelize,
    modelName: 'ModelName',
    tableName: 'modelnames', // Adjust this if needed
  });
  return ModelName
};