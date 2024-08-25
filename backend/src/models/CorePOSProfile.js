module.exports = (sequelize, DataTypes) => {
  const CorePOSProfile = sequelize.define('CorePOSProfile', {
    profileName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Unique name for each core POS profile (e.g., "Toast", "Square")
    },
    integrationSettingsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PosIntegrationSettings',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    defaultAPISettings: {
      type: DataTypes.JSONB, // Store default settings for the POS provider (e.g., API base URL, headers)
      allowNull: true,
    },
    translationMapping: {
      type: DataTypes.JSONB, // Mapping from our system fields to the POS provider's fields
      allowNull: true,
    },
    hardcodedSettings: {
      type: DataTypes.JSONB, // Store any hardcoded values needed for specific integrations
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Control if this profile should be used
    },
  });

  CorePOSProfile.associate = (models) => {
    CorePOSProfile.belongsTo(models.PosIntegrationSettings, { foreignKey: 'integrationSettingsId', onDelete: 'CASCADE' });
    CorePOSProfile.hasMany(models.LocationPOSProfile, { foreignKey: 'corePOSProfileId' }); // Associate with location-specific profiles
  };

  return CorePOSProfile;
};
