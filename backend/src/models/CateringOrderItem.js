module.exports = (sequelize, DataTypes) => {
  const CateringOrderItem = sequelize.define('CateringOrderItem', {
    cateringOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CateringOrders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuItems',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pointsPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    specialInstructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    modifiers: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    extras: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    customizations: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    isPromoItem: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    posSyncData: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {
    tableName: 'CateringOrderItems',
    timestamps: true,
  });

  CateringOrderItem.associate = (models) => {
    CateringOrderItem.belongsTo(models.CateringOrder, { foreignKey: 'cateringOrderId' });
    CateringOrderItem.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });

    if (models.MenuItemModifier) {
      CateringOrderItem.hasMany(models.MenuItemModifier, { foreignKey: 'cateringOrderItemId' });
    }
    if (models.CateringOrderExtra) {
      CateringOrderItem.hasMany(models.CateringOrderExtra, { foreignKey: 'cateringOrderItemId' });
    }
    if (models.CateringOrderCustomization) {
      CateringOrderItem.hasMany(models.CateringOrderCustomization, { foreignKey: 'cateringOrderItemId' });
    }
    if (models.CateringOrderItemAnalytics) {
      CateringOrderItem.hasMany(models.CateringOrderItemAnalytics, { foreignKey: 'cateringOrderItemId' });
    }
  };

  return CateringOrderItem;
};
