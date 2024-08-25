module.exports = (sequelize, DataTypes) => {
  const RolePermissions = sequelize.define('RolePermissions', {
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Permissions',
        key: 'id',
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },
  });

  RolePermissions.associate = (models) => {
    // Role to Permission relationship for direct access
    RolePermissions.belongsTo(models.Role, { foreignKey: 'roleId' });
    RolePermissions.belongsTo(models.Permission, { foreignKey: 'permissionId' });
  };

  return RolePermissions;
};
