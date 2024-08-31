const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ClientProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ClientProfile.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  ClientProfile.init(ClientProfile.attributes, {
    sequelize,
    modelName: 'ClientProfile',
    tableName: 'clientprofiles', // Adjust this if needed
  });
  return ClientProfile
};