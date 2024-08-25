module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    socComplianceLevel: {
      type: DataTypes.STRING,
      allowNull: true, // SOC level such as 'SOC1', 'SOC2', etc.
    },
  });

  AuditLog.associate = (models) => {
    AuditLog.belongsTo(models.User, { foreignKey: 'userId' });
    AuditLog.belongsTo(models.Client, { foreignKey: 'clientId', allowNull: true });

    // Association with client for better tenant-based auditing
    AuditLog.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  // Hook to automatically add SOC compliance based on action
  AuditLog.addHook('beforeCreate', (log) => {
    if (log.action.includes('Delete') || log.action.includes('Update')) {
      log.socComplianceLevel = 'SOC2'; // Automatically set SOC2 compliance for sensitive actions
    }
  });

  return AuditLog;
};
