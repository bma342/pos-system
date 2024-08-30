'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoleTemplate extends Model {
    static associate(models) {
      RoleTemplate.belongsToMany(models.Role, {
        through: models.RoleTemplateAssignments,
        foreignKey: 'roleTemplateId',
        otherKey: 'roleId',
        as: 'AssignedRoles',
      });
      RoleTemplate.belongsTo(models.Client, { 
        foreignKey: 'clientId', 
        allowNull: true,
        as: 'Client',
      });
    }
  }

  RoleTemplate.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isEditable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isPredefined: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'RoleTemplate',
    tableName: 'RoleTemplates',
    timestamps: true,
  });

  return RoleTemplate;
};
