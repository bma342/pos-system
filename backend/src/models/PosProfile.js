module.exports = (sequelize, DataTypes) => {
  const PosProfile = sequelize.define('PosProfile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posProvider: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'PosProfiles',
    timestamps: true,
  });

  PosProfile.associate = (models) => {
    if (models.Location) PosProfile.belongsTo(models.Location, { foreignKey: 'locationId' });
    if (models.PosSyncHistory) PosProfile.hasMany(models.PosSyncHistory, { foreignKey: 'posProfileId', as: 'syncHistory' });
  };

  PosProfile.addHook('beforeSave', async (profile, options) => {
    // Validate that the associated location exists
    const location = await sequelize.models.Location.findByPk(profile.locationId, { transaction: options.transaction });
    if (!location) {
      throw new Error(`Location with id ${profile.locationId} does not exist`);
    }

    // Encrypt sensitive data
    if (profile.changed('posApiKey')) {
      profile.posApiKey = await sequelize.models.Encryption.encrypt(profile.posApiKey);
    }
    if (profile.changed('posSecretKey')) {
      profile.posSecretKey = await sequelize.models.Encryption.encrypt(profile.posSecretKey);
    }

    // Log the change
    if (profile.changed()) {
      await sequelize.models.PosProfileChangeLog.create({
        profileId: profile.id,
        changes: profile.changed().reduce((acc, field) => {
          if (field !== 'posApiKey' && field !== 'posSecretKey') {
            acc[field] = {
              oldValue: profile.previous(field),
              newValue: profile[field]
            };
          } else {
            acc[field] = {
              oldValue: '[REDACTED]',
              newValue: '[REDACTED]'
            };
          }
          return acc;
        }, {}),
        changeReason: 'POS Profile updated'
      }, { transaction: options.transaction });
    }
  });

  return PosProfile;
};
