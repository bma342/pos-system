module.exports = (sequelize, DataTypes) => {
  const DeliveryDriver = sequelize.define('DeliveryDriver', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    driverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vehicleType: {
      type: DataTypes.STRING, // E.g., "Car", "Bike", "Truck"
      allowNull: true,
    },
    vehicleDetails: {
      type: DataTypes.JSONB, // Example: { make: 'Toyota', model: 'Camry', plate: 'XYZ-1234' }
      allowNull: true,
    },
    deliveryRadius: {
      type: DataTypes.FLOAT, // Radius in miles or kilometers
      allowNull: true,
    },
    driverStatus: {
      type: DataTypes.STRING,
      defaultValue: 'available', // Status could be 'available', 'on-delivery', 'unavailable'
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    assignedOrders: {
      type: DataTypes.JSONB, // Track assigned orders with additional details
      allowNull: true,
    },
    lastDeliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional, if the driver is linked to a specific location
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    commissionRate: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optionally track commission rates for drivers
    },
  });

  DeliveryDriver.associate = (models) => {
    DeliveryDriver.belongsTo(models.User, { foreignKey: 'userId' });
    DeliveryDriver.belongsToMany(models.CateringOrder, {
      through: 'CateringOrderAssignments',
      foreignKey: 'driverId',
    });
    DeliveryDriver.belongsToMany(models.Location, { through: 'DriverLocations', foreignKey: 'driverId' });
    DeliveryDriver.hasMany(models.CateringOrderAssignments, { foreignKey: 'driverId' });

    // Optional: Associate drivers with reviews or ratings if needed
    DeliveryDriver.hasMany(models.DriverRating, { foreignKey: 'driverId' });
  };

  return DeliveryDriver;
};

