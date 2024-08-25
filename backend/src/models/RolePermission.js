module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Permissions',
        key: 'id',
      },
    },
  });

  RolePermission.associate = (models) => {
    // RolePermission association back to Roles and Permissions
    RolePermission.belongsTo(models.Role, { foreignKey: 'roleId' });
    RolePermission.belongsTo(models.Permission, { foreignKey: 'permissionId' });
  };

  return RolePermission;
};
