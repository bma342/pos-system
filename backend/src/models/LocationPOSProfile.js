module.exports = (sequelize, DataTypes) => {
  const LocationPOSProfile = sequelize.define('LocationPOSProfile', {
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coreProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    syncEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    syncSchedule: {
      type: DataTypes.STRING,
      defaultValue: 'daily',
    },
    roundingOption: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    flatUpliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    enableInventorySync: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'LocationPOSProfiles',
    timestamps: true,
  });

  LocationPOSProfile.associate = (models) => {
    if (models.CorePOSProfile) {
      LocationPOSProfile.belongsTo(models.CorePOSProfile, { foreignKey: 'coreProfileId' });
    }
    if (models.Location) {
      LocationPOSProfile.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
    if (models.PosSyncHistory) {
      LocationPOSProfile.hasMany(models.PosSyncHistory, { foreignKey: 'locationPosProfileId', as: 'syncHistory' });
    }
  };

  LocationPOSProfile.addHook('beforeSave', async (profile, options) => {
    // Validate that the associated location and core profile exist
    const [location, coreProfile] = await Promise.all([
      sequelize.models.Location.findByPk(profile.locationId, { transaction: options.transaction }),
      sequelize.models.CorePOSProfile.findByPk(profile.coreProfileId, { transaction: options.transaction })
    ]);

    if (!location) {
      throw new Error(`Location with id ${profile.locationId} does not exist`);
    }

    if (!coreProfile) {
      throw new Error(`CorePOSProfile with id ${profile.coreProfileId} does not exist`);
    }

    // Log the change
    if (profile.changed()) {
      await sequelize.models.ProfileChangeLog.create({
        profileId: profile.id,
        changes: profile.changed().reduce((acc, field) => {
          acc[field] = {
            oldValue: profile.previous(field),
            newValue: profile[field]
          };
          return acc;
        }, {}),
        changeReason: 'Profile updated'
      }, { transaction: options.transaction });
    }
  });

  return LocationPOSProfile;
};
