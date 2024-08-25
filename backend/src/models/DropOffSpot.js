module.exports = (sequelize, DataTypes) => {
  const DropOffSpot = sequelize.define('DropOffSpot', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gpsCoordinates: {
      type: DataTypes.GEOGRAPHY, // Using PostGIS for geolocation
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    distanceFromLocation: {
      type: DataTypes.FLOAT, // Distance from the main location in miles or kilometers
      allowNull: false,
    },
    scheduledDropOffTimes: {
      type: DataTypes.JSONB, // Store scheduled drop-off times, e.g., {"Mon-Fri": ["2:00 PM", "4:00 PM"]}
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Indicates if the drop-off spot is currently active
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

  DropOffSpot.associate = (models) => {
    DropOffSpot.belongsTo(models.Location, { foreignKey: 'locationId' });

    // If tracking usage of drop-off spots, consider associations with analytics or reporting models
  };

  return DropOffSpot;
};
