'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.Permission, {
        through: 'RolePermissions',
        foreignKey: 'roleId',
        otherKey: 'permissionId',
      });
      Role.hasMany(models.User, { foreignKey: 'roleId' });
      Role.belongsTo(models.Client, { foreignKey: 'clientId', allowNull: false });
      Role.belongsToMany(models.RoleTemplate, {
        through: models.RoleTemplateAssignments,
        foreignKey: 'roleId',
        otherKey: 'roleTemplateId',
        as: 'AssignedTemplates',
      });
    }
  }

  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isPredefined: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isEditable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isAssignable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;
};
