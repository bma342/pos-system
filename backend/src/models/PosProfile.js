module.exports = (sequelize, DataTypes) => {
  const PosProfile = sequelize.define('PosProfile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posProvider: {
      type: DataTypes.STRING,
      allowNull: false, // e.g., 'Square', 'Toast', 'Revel'
    },
    posApiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posSecretKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
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

  PosProfile.associate = (models) => {
    PosProfile.belongsTo(models.Location, { foreignKey: 'locationId' });

    // Association with POS-related sync histories
    PosProfile.hasMany(models.PosSyncHistory, { foreignKey: 'posProfileId', as: 'syncHistory' });
  };

  // Hooks to manage sensitive operations like key updates or sync settings
  PosProfile.addHook('beforeSave', (profile) => {
    // Example: Additional validation or logging before saving changes
  });

  return PosProfile;
};
