module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'UTC',
    },
    prepTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
    },
    storeImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gpsCoordinates: {
      type: DataTypes.GEOGRAPHY,
      allowNull: true,
    },
    standardHours: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    temporaryHours: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    upliftSettings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isCateringEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isSecondaryLocation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    parentLocationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'Locations',
    timestamps: true,
  });

  Location.associate = (models) => {
    if (models.Menu) Location.hasMany(models.Menu, { foreignKey: 'locationId', as: 'menus' });
    if (models.LocationHours) Location.hasMany(models.LocationHours, { foreignKey: 'locationId', as: 'hours' });
    if (models.LocationMenuOverride) Location.hasMany(models.LocationMenuOverride, { foreignKey: 'locationId', as: 'menuOverrides' });
    if (models.PosIntegration) Location.hasMany(models.PosIntegration, { foreignKey: 'locationId', as: 'posIntegrations' });
    if (models.PosProfile) Location.hasMany(models.PosProfile, { foreignKey: 'locationId', as: 'posProfiles' });
    if (models.ProviderPricing) Location.hasMany(models.ProviderPricing, { foreignKey: 'locationId', as: 'providerPricings' });
    if (models.HouseAccount) Location.hasMany(models.HouseAccount, { foreignKey: 'locationId', as: 'houseAccounts' });
    if (models.CateringOrder) Location.hasMany(models.CateringOrder, { foreignKey: 'locationId', as: 'cateringOrders' });
    if (models.Client) Location.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    Location.belongsTo(models.Location, { foreignKey: 'parentLocationId', as: 'parentLocation' });
    Location.hasMany(models.Location, { foreignKey: 'parentLocationId', as: 'childLocations' });
  };

  Location.addHook('beforeCreate', async (location, options) => {
    const Client = sequelize.models.Client;
    if (Client) {
      const clientExists = await Client.findByPk(location.clientId, { transaction: options.transaction });
      if (!clientExists) {
        throw new Error('Client not found');
      }
    }
  });

  return Location;
};
