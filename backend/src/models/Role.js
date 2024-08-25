module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex', // Ensures uniqueness in combination with clientId
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Define role hierarchy level (1 for Super Admin, 2 for Admin, etc.)
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional description of the role
    },
    isPredefined: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Flag for predefined roles
    },
    isEditable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Determines if the role can be edited by client admin
    },
    isAssignable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Determines if the role can be assigned to users
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

  Role.associate = (models) => {
    // Role to Permission association (Many-to-Many)
    Role.belongsToMany(models.Permission, {
      through: 'RolePermissions',
      foreignKey: 'roleId',
      otherKey: 'permissionId',
    });

    // Role to User association (One-to-Many)
    Role.hasMany(models.User, { foreignKey: 'roleId' });

    // Role to Client association (Many-to-One)
    Role.belongsTo(models.Client, { foreignKey: 'clientId', allowNull: false });

    // Role to RoleTemplate association for predefined templates (Many-to-Many)
    Role.belongsToMany(models.RoleTemplate, {
      through: 'RoleTemplateAssignments',
      foreignKey: 'roleId',
      otherKey: 'roleTemplateId',
    });

    // Role to RoleTemplateAssignments (One-to-Many)
    Role.hasMany(models.RoleTemplateAssignments, { foreignKey: 'roleId' });
  };

  return Role;
};
