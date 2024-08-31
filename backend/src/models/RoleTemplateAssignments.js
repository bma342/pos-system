const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class RoleTemplateAssignments extends BaseModel {
  static modelAttributes(DataTypes) {
    return {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      roleTemplateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'RoleTemplates',
          key: 'id'
        }
      }
    };
  }
}

module.exports = RoleTemplateAssignments;