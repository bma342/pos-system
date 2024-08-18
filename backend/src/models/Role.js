module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Define the role hierarchy level (1 for Super Admin, 2 for Admin, etc.)
    },
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.Permission, {
      through: 'RolePermissions',
      foreignKey: 'roleId',
    });
  };

  return Role;
};
