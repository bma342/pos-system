module.exports = (sequelize, DataTypes) => {
  const ClientSettings = sequelize.define('ClientSettings', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    billingPreferences: {
      type: DataTypes.JSONB, // Store billing settings like payment terms, invoicing frequency, etc.
      allowNull: true,
    },
    posIntegrationSettings: {
      type: DataTypes.JSONB, // Specific settings related to POS integration (e.g., default providers)
      allowNull: true,
    },
    apiAccessSettings: {
      type: DataTypes.JSONB, // Store API keys, rate limits, IP whitelisting, etc.
      allowNull: true,
    },
    securitySettings: {
      type: DataTypes.JSONB, // Store security configurations like 2FA, password policies, etc.
      allowNull: true,
    },
    brandingSettings: {
      type: DataTypes.JSONB, // Store logo URLs, color schemes, and other branding configurations
      allowNull: true,
    },
    notificationSettings: {
      type: DataTypes.JSONB, // Store notification preferences like email templates, SMS settings
      allowNull: true,
    },
    featureToggles: {
      type: DataTypes.JSONB, // Store enabled/disabled features at the client level
      allowNull: true,
    },
    complianceSettings: {
      type: DataTypes.JSONB, // Store compliance configurations (e.g., GDPR, PCI)
      allowNull: true,
    },
  });

  ClientSettings.associate = (models) => {
    ClientSettings.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return ClientSettings;
};
