module.exports = (sequelize, DataTypes) => {
  const PricingUplift = sequelize.define('PricingUplift', {
    providerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    roundingOption: {
      type: DataTypes.ENUM('none', 'up', 'down', 'nearest'),
      allowNull: false,
      defaultValue: 'none',
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
      allowNull: true, // Optional if the uplift is item-specific
      references: {
        model: 'MenuItems',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    menuGroupId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional if the uplift is group-specific
      references: {
        model: 'MenuGroups',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    syncStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // Can be 'pending', 'active', or 'completed'
    },
    providerIntegrationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProviderIntegrations',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  PricingUplift.associate = (models) => {
    PricingUplift.belongsTo(models.Location, { foreignKey: 'locationId' });
    PricingUplift.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    PricingUplift.belongsTo(models.MenuGroup, { foreignKey: 'menuGroupId' });
    PricingUplift.belongsTo(models.Client, { foreignKey: 'clientId' });
    PricingUplift.belongsTo(models.ProviderIntegration, { foreignKey: 'providerIntegrationId' });
  };

  return PricingUplift;
};

