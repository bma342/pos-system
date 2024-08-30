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
      defaultValue: false,
    },
    flatUpliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    syncFrequency: {
      type: DataTypes.STRING,
      defaultValue: 'daily',
    },
    syncMenu: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    syncInventory: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    syncOrders: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'PosIntegrations',
    timestamps: true,
  });

  PosIntegration.associate = (models) => {
    if (models.Location) PosIntegration.belongsTo(models.Location, { foreignKey: 'locationId' });
    if (models.MenuSyncHistory) PosIntegration.hasMany(models.MenuSyncHistory, { foreignKey: 'posIntegrationId' });
    if (models.InventorySyncHistory) PosIntegration.hasMany(models.InventorySyncHistory, { foreignKey: 'posIntegrationId' });
    if (models.OrderSyncHistory) PosIntegration.hasMany(models.OrderSyncHistory, { foreignKey: 'posIntegrationId' });
  };

  return PosIntegration;
};
