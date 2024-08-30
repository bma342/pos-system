module.exports = (sequelize, DataTypes) => {
  const CateringOrder = sequelize.define('CateringOrder', {
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    houseAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'scheduled',
    },
    deliveryMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driverTip: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    kitchenTip: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    serviceFees: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    cateringFees: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    commissaryKitchenId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    taxExempt: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    taxIdNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'CateringOrders',
    timestamps: true,
  });

  CateringOrder.associate = (models) => {
    if (models.Guest) {
      CateringOrder.belongsTo(models.Guest, { foreignKey: 'guestId' });
    }
    if (models.HouseAccount) {
      CateringOrder.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
    }
    if (models.Location) {
      CateringOrder.belongsTo(models.Location, { foreignKey: 'locationId' });
      CateringOrder.belongsTo(models.Location, { foreignKey: 'commissaryKitchenId', as: 'commissaryKitchen' });
    }
  };

  return CateringOrder;
};
