module.exports = (sequelize, DataTypes) => {
  const OrderHistory = sequelize.define('OrderHistory', {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderDetails: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  OrderHistory.associate = (models) => {
    OrderHistory.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderHistory.belongsTo(models.Guest, { foreignKey: 'guestId' });
    OrderHistory.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return OrderHistory;
};
