module.exports = (sequelize, DataTypes) => {
  const PosIntegration = sequelize.define('PosIntegration', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiBaseUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentType: {
      type: DataTypes.STRING,
      defaultValue: 'application/json',
    },
    roundingOption: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Whether to apply rounding to prices
    },
    flatUpliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional flat uplift percentage for prices
    },
    syncFrequency: {
      type: DataTypes.STRING,
      defaultValue: 'daily', // e.g., 'hourly', 'daily', 'weekly'
    },
    syncMenu: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Whether menus should be synced automatically
    },
    syncInventory: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Whether inventory should be synced automatically
    },
    syncOrders: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Whether orders should be synced automatically
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
  });

  PosIntegration.associate = (models) => {
    PosIntegration.belongsTo(models.Location, { foreignKey: 'locationId' });
    PosIntegration.hasMany(models.MenuSyncHistory, { foreignKey: 'posIntegrationId' });
    PosIntegration.hasMany(models.InventorySyncHistory, { foreignKey: 'posIntegrationId' });
    PosIntegration.hasMany(models.OrderSyncHistory, { foreignKey: 'posIntegrationId' });
  };

  return PosIntegration;
};
