module.exports = (sequelize, DataTypes) => {
  const ClientPreferences = sequelize.define('ClientPreferences', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    themeSettings: {
      type: DataTypes.JSONB, // Store branding options like colors, fonts, logos, etc.
      allowNull: true,
    },
    featureToggles: {
      type: DataTypes.JSONB, // Store enabled/disabled features for the client
      allowNull: true,
    },
    notificationSettings: {
      type: DataTypes.JSONB, // Store notification preferences like email/SMS settings
      allowNull: true,
    },
    loyaltyProgramSettings: {
      type: DataTypes.JSONB, // Specific settings related to loyalty programs
      allowNull: true,
    },
    marketingPreferences: {
      type: DataTypes.JSONB, // Store marketing opt-in/out preferences and campaign settings
      allowNull: true,
    },
    miniSiteSettings: {
      type: DataTypes.JSONB, // Store settings for custom mini-sites (if applicable)
      allowNull: true,
    },
    complianceSettings: {
      type: DataTypes.JSONB, // Store compliance configurations (e.g., GDPR, PCI)
      allowNull: true,
    },
  });

  ClientPreferences.associate = (models) => {
    ClientPreferences.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return ClientPreferences;
};
