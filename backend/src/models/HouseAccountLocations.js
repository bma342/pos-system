module.exports = (sequelize, DataTypes) => {
  const HouseAccountLocations = sequelize.define('HouseAccountLocations', {
    houseAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPrimaryLocation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    billingAllocationPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  }, {
    tableName: 'HouseAccountLocations',
    timestamps: true,
  });

  HouseAccountLocations.associate = (models) => {
    if (models.HouseAccount) {
      HouseAccountLocations.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
    }
    if (models.Location) {
      HouseAccountLocations.belongsTo(models.Location, { foreignKey: 'locationId' });
    }
  };

  return HouseAccountLocations;
};
