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
    billingType: {
      type: DataTypes.STRING, // 'credit card', 'PO', 'invoice'
      allowNull: true,
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    serviceFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    additionalCateringFee: {
      type: DataTypes.FLOAT, // For catering-specific fees
      allowNull: true,
    },
    tipAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    loyaltyPointsUsed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discountApplied: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    posPayload: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    earnedPoints: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    orderSource: {
      type: DataTypes.STRING, // e.g., 'in-store', 'online', 'DoorDash', 'UberEats'
      allowNull: true,
    },
    orderType: {
      type: DataTypes.STRING, // e.g., 'dine-in', 'takeout', 'delivery', 'catering'
      allowNull: true,
    },
    commissaryLocationId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Catering orders processed by a commissary
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    dropOffSpotId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Reference for specific drop-off spots for catering orders
      references: {
        model: 'DropOffSpots',
        key: 'id',
      },
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Guest, { foreignKey: 'guestId' });
    Order.belongsTo(models.Location, { foreignKey: 'locationId' });
    Order.belongsTo(models.DropOffSpot, { foreignKey: 'dropOffSpotId' }); // New association
    Order.belongsTo(models.Location, { foreignKey: 'commissaryLocationId', as: 'CommissaryLocation' }); // New association
    Order.hasMany(models.MenuItem, { foreignKey: 'orderId' });
    Order.hasMany(models.OrderHistory, { foreignKey: 'orderId' });
    Order.hasMany(models.Discount, { foreignKey: 'orderId' }); // Allow discounts to be tied to specific orders
  };

  return Order;
};

