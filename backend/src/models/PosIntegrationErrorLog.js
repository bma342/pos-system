module.exports = (sequelize, DataTypes) => {
  const PosIntegrationErrorLog = sequelize.define('PosIntegrationErrorLog', {
    integrationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PosIntegrationSettings',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    errorCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requestPayload: {
      type: DataTypes.JSONB,
      allowNull: true, // Store the payload that was sent during the failed request
    },
    responsePayload: {
      type: DataTypes.JSONB,
      allowNull: true, // Store the response data if available
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Timestamp when the issue was resolved
    },
    retryCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });

  PosIntegrationErrorLog.associate = (models) => {
    PosIntegrationErrorLog.belongsTo(models.PosIntegrationSettings, { foreignKey: 'integrationId', onDelete: 'CASCADE' });
  };

  return PosIntegrationErrorLog;
};
