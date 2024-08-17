module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentReadyTime: {
      type: DataTypes.INTEGER, // Ready time in minutes
      allowNull: false,
      defaultValue: 30, // Default ready time
    },
    throttleSettings: {
      type: DataTypes.JSON, // Stores item, amount, and order thresholds and increments
      allowNull: true,
      defaultValue: {
        itemThreshold: 20,
        itemIncrement: 5,
        amountThreshold: 100,
        amountIncrement: 10,
        orderThreshold: 3,
        orderIncrement: 15,
      },
    },
  });

  Location.associate = (models) => {
    Location.hasMany(models.Order, { foreignKey: 'locationId' });
  };

  return Location;
};
