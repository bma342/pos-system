module.exports = (sequelize, DataTypes) => {
  const ProviderIntegration = sequelize.define('ProviderIntegration', {
    providerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: true, // Store additional provider-specific settings
    },
    syncStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active', // Could be 'active', 'paused', or 'inactive'
    },
    lastSyncDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    totalOrdersSynced: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    errorLog: {
      type: DataTypes.JSONB,
      allowNull: true, // Store recent sync errors if any
    },
    integrationId: {
      type: DataTypes.STRING, // Unique ID for the specific integration
      allowNull: true,
    },
    providerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Providers',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  ProviderIntegration.associate = (models) => {
    ProviderIntegration.belongsTo(models.Location, { foreignKey: 'locationId' });
    ProviderIntegration.belongsTo(models.Provider, { foreignKey: 'providerId' });
    ProviderIntegration.hasMany(models.LocationMenuOverride, { foreignKey: 'providerId' });
    ProviderIntegration.hasMany(models.Report, { foreignKey: 'providerIntegrationId' }); // For reporting enhancements
    ProviderIntegration.hasMany(models.PricingUplift, { foreignKey: 'providerIntegrationId' });

    // New association for syncing specific data points
    ProviderIntegration.belongsToMany(models.MenuItem, {
      through: 'ProviderMenuItemSync',
      foreignKey: 'providerIntegrationId',
      otherKey: 'menuItemId',
    });
  };

  return ProviderIntegration;
};
