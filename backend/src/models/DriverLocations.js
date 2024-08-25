// src/models/DriverLocations.js

module.exports = (sequelize, DataTypes) => {
  const DriverLocations = sequelize.define('DriverLocations', {
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DeliveryDrivers',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    assignedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    isPrimaryLocation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if this is the primary location for the driver
    },
    deliveryRadius: {
      type: DataTypes.FLOAT, // Define custom delivery radius for this location assignment
      allowNull: true,
    },
    customHours: {
      type: DataTypes.JSONB, // Store custom hours for this driver-location assignment
      allowNull: true,
    },
    driverStatus: {
      type: DataTypes.STRING,
      defaultValue: 'available', // 'available', 'on-delivery', 'unavailable'
    },
  });

  DriverLocations.associate = (models) => {
    DriverLocations.belongsTo(models.DeliveryDriver, { foreignKey: 'driverId' });
    DriverLocations.belongsTo(models.Location, { foreignKey: 'locationId' });

    // Ensure that a driver can be assigned to multiple locations and vice versa
    models.DeliveryDriver.belongsToMany(models.Location, { through: DriverLocations, foreignKey: 'driverId' });
    models.Location.belongsToMany(models.DeliveryDriver, { through: DriverLocations, foreignKey: 'locationId' });
  };

  return DriverLocations;
};
