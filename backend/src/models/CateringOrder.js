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
      references: {
        model: 'Guests',
        key: 'id',
      },
    },
    houseAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'HouseAccounts',
        key: 'id',
      },
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id',
      },
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
      references: {
        model: 'Locations',
        key: 'id',
      },
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
  });

  CateringOrder.associate = (models) => {
    CateringOrder.belongsTo(models.Guest, { foreignKey: 'guestId' });
    CateringOrder.belongsTo(models.HouseAccount, { foreignKey: 'houseAccountId' });
    CateringOrder.belongsTo(models.Location, { foreignKey: 'locationId' });
    CateringOrder.belongsTo(models.Location, { foreignKey: 'commissaryKitchenId', as: 'commissaryKitchen' });
  };

  return CateringOrder;
};
