const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class RolePermissions extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

RolePermissions.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  RolePermissions.init(RolePermissions.attributes, {
    sequelize,
    modelName: 'RolePermissions',
    tableName: 'rolepermissionss', // Adjust this if needed
  });
  return RolePermissions
};