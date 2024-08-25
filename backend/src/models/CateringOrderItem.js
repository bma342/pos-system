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
      type: DataTypes.JSONB, // Store modifier details as JSON
      allowNull: true,
    },
    extras: {
      type: DataTypes.JSONB, // Store extra options (e.g., sides, drinks)
      allowNull: true,
    },
    customizations: {
      type: DataTypes.JSONB, // Store any customizations like dietary requests
      allowNull: true,
    },
    isPromoItem: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if this item is part of a promotion
    },
    posSyncData: {
      type: DataTypes.JSONB, // Store POS-specific data for integration
      allowNull: true,
    },
  });

  CateringOrderItem.associate = (models) => {
    CateringOrderItem.belongsTo(models.CateringOrder, { foreignKey: 'cateringOrderId' });
    CateringOrderItem.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });

    // Ensure the items have an association with modifiers, extras, and customizations
    CateringOrderItem.hasMany(models.MenuItemModifier, { foreignKey: 'cateringOrderItemId' });
    CateringOrderItem.hasMany(models.CateringOrderExtra, { foreignKey: 'cateringOrderItemId' });
    CateringOrderItem.hasMany(models.CateringOrderCustomization, { foreignKey: 'cateringOrderItemId' });

    // Optional associations for reporting and analytics
    CateringOrderItem.hasMany(models.CateringOrderItemAnalytics, { foreignKey: 'cateringOrderItemId' });
  };

  return CateringOrderItem;
};

