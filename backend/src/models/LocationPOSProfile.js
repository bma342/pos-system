module.exports = (sequelize, DataTypes) => {
  const LocationPOSProfile = sequelize.define('LocationPOSProfile', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    coreProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CorePOSProfile',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    syncEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Whether synchronization is enabled for this profile
    },
    syncSchedule: {
      type: DataTypes.STRING,
      defaultValue: 'daily', // e.g., 'hourly', 'daily'
    },
    roundingOption: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Whether to apply rounding to prices
    },
    flatUpliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional flat uplift percentage for prices
    },
    enableInventorySync: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Whether inventory sync is enabled
    },
  });

  LocationPOSProfile.associate = (models) => {
    LocationPOSProfile.belongsTo(models.CorePOSProfile, { foreignKey: 'coreProfileId' });
    LocationPOSProfile.belongsTo(models.Location, { foreignKey: 'locationId' });

    // Association with POS-related sync histories
    LocationPOSProfile.hasMany(models.PosSyncHistory, { foreignKey: 'locationPosProfileId', as: 'syncHistory' });
  };

  // Hooks to manage sensitive operations like key updates or sync settings
  LocationPOSProfile.addHook('beforeSave', (profile) => {
    // Example: Additional validation or logging before saving changes
  });

  return LocationPOSProfile;
};
