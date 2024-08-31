const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class checkModelExports extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

checkModelExports.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  checkModelExports.init(checkModelExports.attributes, {
    sequelize,
    modelName: 'checkModelExports',
    tableName: 'checkmodelexportss', // Adjust this if needed
  });
  return checkModelExports
};