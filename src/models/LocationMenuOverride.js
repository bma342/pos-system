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
  });

  LocationMenuOverride.associate = (models) => {
    LocationMenuOverride.belongsTo(models.Location, { foreignKey: 'locationId' });
    LocationMenuOverride.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
  };

  return LocationMenuOverride;
};
