module.exports = (sequelize, DataTypes) => {
  const CommissaryLocation = sequelize.define('CommissaryLocation', {
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
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contactInfo: {
      type: DataTypes.JSONB, // Stores phone number, email, and other contact details
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  CommissaryLocation.associate = (models) => {
    CommissaryLocation.belongsTo(models.Client, { foreignKey: 'clientId' });
    CommissaryLocation.hasMany(models.CateringOrder, { foreignKey: 'commissaryLocationId', as: 'cateringOrders' });
    CommissaryLocation.hasMany(models.Location, { foreignKey: 'parentLocationId', as: 'childLocations' });

    // Association for tracking related orders and deliveries
    CommissaryLocation.hasMany(models.Order, { foreignKey: 'commissaryLocationId', as: 'orders' });
  };

  return CommissaryLocation;
};
