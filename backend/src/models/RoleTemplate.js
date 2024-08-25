module.exports = (sequelize, DataTypes) => {
  const RoleTemplate = sequelize.define('RoleTemplate', {
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
      defaultValue: true, // Determines if the client admin can edit the template
    },
    isPredefined: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Predefined templates controlled by business admin
    },
  });

  RoleTemplate.associate = (models) => {
    // RoleTemplate to Role association (Many-to-Many)
    RoleTemplate.belongsToMany(models.Role, {
      through: 'RoleTemplateAssignments',
      foreignKey: 'roleTemplateId',
    });

    // RoleTemplate belongs to a Client for tenant isolation
    RoleTemplate.belongsTo(models.Client, { foreignKey: 'clientId', allowNull: false });
  };

  return RoleTemplate;
};
