module.exports = (sequelize, DataTypes) => {
  const OrderHistory = sequelize.define('OrderHistory', {
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
  };

  return OrderHistory;
};
