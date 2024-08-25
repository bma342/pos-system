module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING, // Group permissions by category, e.g., "Reports", "User Management", etc.
      allowNull: true,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    viewOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fullAccess: {
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
  });

  Permission.associate = (models) => {
    // Permission to Role association (Many-to-Many)
    Permission.belongsToMany(models.Role, {
      through: 'RolePermissions',
      foreignKey: 'permissionId',
    });

    // Permission to Client association for tenant-based isolation
    Permission.belongsTo(models.Client, { foreignKey: 'clientId', onDelete: 'CASCADE' });

    // Permission to User association (via Roles)
    Permission.belongsToMany(models.User, {
      through: models.Role,
      foreignKey: 'permissionId',
      otherKey: 'userId',
    });
  };

  return Permission;
};
