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
      validate: {
        is: /^\+?[1-9]\d{1,14}$/, // Basic phone number validation
      },
    },
    vehicleType: {
      type: DataTypes.ENUM('Car', 'Bike', 'Truck', 'Scooter'),
      allowNull: true,
    },
    vehicleDetails: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    deliveryRadius: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    driverStatus: {
      type: DataTypes.ENUM('available', 'on-delivery', 'unavailable'),
      defaultValue: 'available',
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    assignedOrders: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    lastDeliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    commissionRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },
  }, {
    tableName: 'DeliveryDrivers',
    timestamps: true,
  });

  DeliveryDriver.associate = (models) => {
    DeliveryDriver.belongsTo(models.User, { foreignKey: 'userId' });
    if (models.CateringOrder) {
      DeliveryDriver.belongsToMany(models.CateringOrder, {
        through: 'CateringOrderAssignments',
        foreignKey: 'driverId',
      });
    }
    if (models.Location) {
      DeliveryDriver.belongsToMany(models.Location, { 
        through: 'DriverLocations', 
        foreignKey: 'driverId' 
      });
    }
    if (models.CateringOrderAssignments) {
      DeliveryDriver.hasMany(models.CateringOrderAssignments, { foreignKey: 'driverId' });
    }
    if (models.DriverRating) {
      DeliveryDriver.hasMany(models.DriverRating, { foreignKey: 'driverId' });
    }
  };

  return DeliveryDriver;
};
