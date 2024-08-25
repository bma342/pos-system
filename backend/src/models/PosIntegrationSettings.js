module.exports = (sequelize, DataTypes) => {
  const PosIntegrationSettings = sequelize.define('PosIntegrationSettings', {
    providerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure unique setting for each POS provider
    },
    apiUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiVersion: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'v1', // Default API version
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestHeaders: {
      type: DataTypes.JSONB, // Store headers required for API calls
      allowNull: true,
    },
    requestMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'POST', // Default HTTP method
    },
    authType: {
      type: DataTypes.STRING, // 'OAuth', 'API Key', etc.
      allowNull: false,
    },
    endpointMappings: {
      type: DataTypes.JSONB, // Map our internal endpoints to the POS provider’s endpoints
      allowNull: true,
    },
    syncFrequency: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'daily', // Could be 'hourly', 'daily', 'weekly', etc.
    },
    errorHandling: {
      type: DataTypes.JSONB, // Custom error handling rules based on provider-specific requirements
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Allow enabling/disabling of the integration
    },
  });

  PosIntegrationSettings.associate = (models) => {
    PosIntegrationSettings.belongsTo(models.PosIntegration, { foreignKey: 'posIntegrationId', onDelete: 'CASCADE' });
  };

  return PosIntegrationSettings;
};
