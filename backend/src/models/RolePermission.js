const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class RolePermission extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

RolePermission.attributes = attributes = {
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Roles', key: 'id' }
  },
  permissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Permissions', key: 'id' }
  }
};

module.exports = (sequelize) => {
  RolePermission.init(RolePermission.attributes, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'rolepermissions', // Adjust this if needed
  });
  return RolePermission
};