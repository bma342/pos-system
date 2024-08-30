'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoleTemplateAssignments extends Model {
    static associate(models) {
      RoleTemplateAssignments.belongsTo(models.Client, { foreignKey: 'clientId' });
      RoleTemplateAssignments.belongsTo(models.Role, { foreignKey: 'roleId' });
      RoleTemplateAssignments.belongsTo(models.RoleTemplate, { foreignKey: 'roleTemplateId' });
    }
  }

  RoleTemplateAssignments.init({
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    roleTemplateId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'RoleTemplates',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RoleTemplateAssignments',
  });

  return RoleTemplateAssignments;
};
