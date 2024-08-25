module.exports = (sequelize, DataTypes) => {
  const PosIntegrationSettings = sequelize.define('PosIntegrationSettings', {
    integrationName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Unique name for each integration (e.g., "Toast API Settings", "Square API Settings")
    },
    apiBaseUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentType: {
      type: DataTypes.STRING,
      defaultValue: 'application/json',
    },
  });

  PosIntegrationSettings.associate = (models) => {
    PosIntegrationSettings.hasMany(models.CorePOSProfile, { foreignKey: 'integrationSettingsId' });
  };

  return PosIntegrationSettings;
};
