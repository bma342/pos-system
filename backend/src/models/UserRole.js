const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class UserRole extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

UserRole.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  UserRole.init(UserRole.attributes, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'userroles', // Adjust this if needed
  });
  return UserRole
};