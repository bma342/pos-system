// src/models/HouseAccountLocations.js
module.exports = (sequelize, DataTypes) => {
  const HouseAccountLocations = sequelize.define('HouseAccountLocations', {
    houseAccountId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'HouseAccounts',
        key: 'id',
      },
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      allowNull: false,
    },
    isPrimaryLocation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Flag to identify the primary location for billing and management
    },
    billingAllocationPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional percentage for cost allocation across multiple locations
    },
  });

  HouseAccountLocations.associate = (models) => {
    HouseAccountLocations.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
    HouseAccountLocations.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return HouseAccountLocations;
};

