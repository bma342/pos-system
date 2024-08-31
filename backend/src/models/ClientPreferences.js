const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ClientPreferences extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ClientPreferences.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  ClientPreferences.init(ClientPreferences.attributes, {
    sequelize,
    modelName: 'ClientPreferences',
    tableName: 'clientpreferencess', // Adjust this if needed
  });
  return ClientPreferences
};