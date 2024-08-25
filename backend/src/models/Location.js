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
      references: {
        model: 'Clients',
        key: 'id',
      },
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
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Location',
    tableName: 'locations',
    timestamps: true,
  });

  Location.associate = (models) => {
    Location.hasMany(models.Menu, { foreignKey: 'locationId', as: 'menus' });
    Location.hasMany(models.LocationHours, { foreignKey: 'locationId', as: 'hours' });
    Location.hasMany(models.LocationMenuOverride, { foreignKey: 'locationId', as: 'menuOverrides' });
    Location.hasMany(models.PosIntegration, { foreignKey: 'locationId', as: 'posIntegrations' });
    Location.hasMany(models.PosProfile, { foreignKey: 'locationId', as: 'posProfiles' });
    Location.hasMany(models.ProviderPricing, { foreignKey: 'locationId', as: 'providerPricings' });
    Location.hasMany(models.HouseAccount, { foreignKey: 'locationId', as: 'houseAccounts' });
    Location.hasMany(models.CateringOrder, { foreignKey: 'locationId', as: 'cateringOrders' });
    Location.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    Location.belongsTo(models.Location, { foreignKey: 'parentLocationId', as: 'parentLocation' });
    Location.hasMany(models.Location, { foreignKey: 'parentLocationId', as: 'childLocations' });

    Location.addHook('beforeCreate', async (location, options) => {
      const clientExists = await models.Client.findByPk(location.clientId);
      if (!clientExists) {
        throw new Error('Client not found');
      }
    });
  };

  return Location;
};
