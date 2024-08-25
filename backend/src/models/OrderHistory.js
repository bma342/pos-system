module.exports = (sequelize, DataTypes) => {
  const OrderHistory = sequelize.define('OrderHistory', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    dropOffSpotId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DropOffSpots',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    commissaryLocationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    taxAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discountsApplied: {
      type: DataTypes.JSONB, // Store details of all discounts applied
      allowNull: true,
    },
    items: {
      type: DataTypes.JSONB, // Store full details of all items in the order, including modifiers
      allowNull: false,
    },
    serviceFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    tipAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    posPayload: {
      type: DataTypes.JSONB, // Stores the JSON package for audit purposes
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['created', 'updated', 'cancelled', 'refunded']], // Ensure action types are consistent
      },
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
    OrderHistory.belongsTo(models.DropOffSpot, { foreignKey: 'dropOffSpotId' });
    OrderHistory.belongsTo(models.CommissaryLocation, { foreignKey: 'commissaryLocationId' });

    // Adding audit log association
    OrderHistory.hasMany(models.AuditLog, { foreignKey: 'orderHistoryId' });

    // Additional hook for automatically logging updates or cancellations
    OrderHistory.addHook('afterUpdate', async (orderHistory, options) => {
      if (orderHistory.action === 'cancelled' || orderHistory.action === 'refunded') {
        await models.AuditLog.create({
          action: orderHistory.action,
          details: {
            orderId: orderHistory.orderId,
            guestId: orderHistory.guestId,
            amount: orderHistory.totalAmount,
          },
          userId: options.userId || null, // Include the user responsible for the action
        });
      }
    });
  };

  return OrderHistory;
};
