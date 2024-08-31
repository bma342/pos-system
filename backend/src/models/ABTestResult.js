const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ABTestResult extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ABTestResult.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  ABTestResult.init(ABTestResult.attributes, {
    sequelize,
    modelName: 'ABTestResult',
    tableName: 'abtestresults', // Adjust this if needed
  });
  return ABTestResult
};