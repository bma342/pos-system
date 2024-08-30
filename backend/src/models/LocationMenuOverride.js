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
      defaultValue: false,
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
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  LocationMenuOverride.associate = (models) => {
    LocationMenuOverride.belongsTo(models.Location, { foreignKey: 'locationId' });
    LocationMenuOverride.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    LocationMenuOverride.belongsTo(models.ProviderIntegration, { foreignKey: 'providerId' });
  };

  LocationMenuOverride.addHook('beforeSave', async (override, options) => {
    if (override.applyUplift && override.upliftPercentage) {
      override.price = override.price + (override.price * (override.upliftPercentage / 100));
    }

    if (override.roundingOption && override.roundingOption !== 'none') {
      switch (override.roundingOption) {
        case 'up':
          override.price = Math.ceil(override.price);
          break;
        case 'down':
          override.price = Math.floor(override.price);
          break;
        case 'nearest':
          override.price = Math.round(override.price);
          break;
      }
    }

    // Log the price change
    if (override.changed('price')) {
      await sequelize.models.PriceChangeLog.create({
        overrideId: override.id,
        oldPrice: override.previous('price'),
        newPrice: override.price,
        changeReason: 'Uplift and rounding applied'
      }, { transaction: options.transaction });
    }
  });

  return LocationMenuOverride;
};
