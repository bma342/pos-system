module.exports = (sequelize, DataTypes) => {
  const CateringAdmin = sequelize.define('CateringAdmin', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
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
    commissaryKitchen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Flag to determine if this location is a commissary kitchen
    },
    deliveryRadius: {
      type: DataTypes.FLOAT, // Radius in miles or kilometers
      allowNull: true,
    },
    dropOffTimes: {
      type: DataTypes.JSONB, // Store scheduled drop-off times for commissary locations
      allowNull: true,
    },
    adminPreferences: {
      type: DataTypes.JSONB, // Custom settings and preferences for the admin
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  CateringAdmin.associate = (models) => {
    CateringAdmin.belongsTo(models.User, { foreignKey: 'userId' });
    CateringAdmin.belongsTo(models.Location, { foreignKey: 'locationId' });
    CateringAdmin.hasMany(models.CateringOrder, { foreignKey: 'cateringAdminId' });

    // Relationship with DeliveryDrivers for commissary kitchens
    CateringAdmin.hasMany(models.DeliveryDriver, { foreignKey: 'cateringAdminId' });

    // Optional relationship with DropOffSpot
    CateringAdmin.hasMany(models.DropOffSpot, { foreignKey: 'cateringAdminId' });

    // Optional relationship with CorePOS setup for preconfigured profiles
    CateringAdmin.belongsTo(models.PosIntegration, { foreignKey: 'posIntegrationId' });

    // Include relationships for handling commissary-specific operations, inventory management, etc.
  };

  return CateringAdmin;
};

