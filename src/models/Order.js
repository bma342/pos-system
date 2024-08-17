module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cancellationCutoff: {
      type: DataTypes.INTEGER, // Time in hours before the order for cancellation
      defaultValue: 24, // Default is 24 hours for catering
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Guest, { foreignKey: 'guestId' });
    Order.belongsTo(models.Location, { foreignKey: 'locationId' });
    Order.hasMany(models.MenuItem, { foreignKey: 'orderId' });
  };

  return Order;
};
