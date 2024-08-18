module.exports = (sequelize, DataTypes) => {
  const CateringOrder = sequelize.define('CateringOrder', {
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    houseAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    scheduledDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderDetails: {
      type: DataTypes.JSONB, // Store detailed items, prices, etc.
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'scheduled',
    },
  });

  CateringOrder.associate = (models) => {
    CateringOrder.belongsTo(models.Guest, { foreignKey: 'guestId' });
    CateringOrder.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
    CateringOrder.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return CateringOrder;
};
