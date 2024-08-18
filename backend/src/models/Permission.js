module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true, // Group permissions by category, e.g., "Reports", "User Management", etc.
    },
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: 'RolePermissions',
      foreignKey: 'permissionId',
    });
  };

  return Permission;
};
