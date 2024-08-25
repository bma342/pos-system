module.exports = (sequelize, DataTypes) => {
  const RoleTemplateAssignments = sequelize.define('RoleTemplateAssignments', {
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
      allowNull: false, // Ensure tenant isolation
    },
  });

  RoleTemplateAssignments.associate = (models) => {
    // Associations between roles, templates, and clients
    RoleTemplateAssignments.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return RoleTemplateAssignments;
};
