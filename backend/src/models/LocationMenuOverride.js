module.exports = (sequelize, DataTypes) => {
  const LocationMenuOverride = sequelize.define('LocationMenuOverride', {
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    upliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    pointsPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    applyUplift: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Ensure uplift is optional and not applied when using points
    },
    roundingOption: {
      type: DataTypes.ENUM('none', 'up', 'down', 'nearest'),
      defaultValue: 'none',
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProviderIntegrations',
        key: 'id',
      },
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
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuItems',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true, // Optional: define start date for the override
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true, // Optional: define end date for the override
    },
  });

  LocationMenuOverride.associate = (models) => {
    LocationMenuOverride.belongsTo(models.Location, { foreignKey: 'locationId' });
    LocationMenuOverride.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    LocationMenuOverride.belongsTo(models.ProviderIntegration, { foreignKey: 'providerId' }); // Association with ProviderIntegration

    // Add custom logic for uplift and rounding
    LocationMenuOverride.addHook('beforeSave', async (override, options) => {
      if (override.applyUplift && override.upliftPercentage) {
        override.price += override.price * (override.upliftPercentage / 100);
      }

      if (override.roundingOption && override.roundingOption !== 'none') {
        if (override.roundingOption === 'up') {
          override.price = Math.ceil(override.price);
        } else if (override.roundingOption === 'down') {
          override.price = Math.floor(override.price);
        } else if (override.roundingOption === 'nearest') {
          override.price = Math.round(override.price);
        }
      }
    });
  };

  return LocationMenuOverride;
};
