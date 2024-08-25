module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upliftPercentage: {
      type: DataTypes.FLOAT,
      defaultValue: 20.0, // Default uplift percentage for this provider
    },
    roundingOption: {
      type: DataTypes.STRING,
      defaultValue: '.99', // Default rounding option (e.g., rounding up to nearest .99)
    },
    applyUpliftAsServiceFee: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Whether to apply uplift as a service fee
    },
    integrationId: {
      type: DataTypes.STRING, // Store the unique ID or GUID for third-party integration (e.g., POS-specific)
      allowNull: true,
    },
    providerType: {
      type: DataTypes.STRING, // Define the type (e.g., 'Delivery', 'POS', 'Payment Gateway')
      allowNull: false,
    },
    apiSettings: {
      type: DataTypes.JSONB, // Store API-related settings (e.g., base URL, headers)
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Provider.associate = (models) => {
    Provider.hasMany(models.ServiceFee, { foreignKey: 'providerId' });
    Provider.hasMany(models.PricingUplift, { foreignKey: 'providerId' });
    Provider.hasMany(models.ProviderIntegration, { foreignKey: 'providerId' });
    Provider.hasMany(models.ProviderPricing, { foreignKey: 'providerId' });

    // Associations for enhanced functionality and data flow
    Provider.hasMany(models.LocationMenuOverride, { foreignKey: 'providerId' });
    Provider.hasMany(models.PosProfile, { foreignKey: 'providerId' });
  };

  return Provider;
};
