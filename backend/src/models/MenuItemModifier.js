module.exports = (sequelize, DataTypes) => {
  const MenuItemModifier = sequelize.define('MenuItemModifier', {
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    removable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    priceAdjustment: {
      type: DataTypes.FLOAT,
      allowNull: true, // Adjust the price based on the modifier
      defaultValue: 0.0,
    },
    pointsAdjustment: {
      type: DataTypes.INTEGER,
      allowNull: true, // Adjust points price if applicable
      defaultValue: 0,
    },
    abTestVariant: {
      type: DataTypes.STRING, // Track the A/B test variant ('A', 'B')
      allowNull: true,
    },
  });

  MenuItemModifier.associate = (models) => {
    MenuItemModifier.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    MenuItemModifier.belongsTo(models.Modifier, { foreignKey: 'modifierId' });

    // Associate back to the Modifier and MenuItem for easier access
    models.Modifier.hasMany(MenuItemModifier, { foreignKey: 'modifierId' });
    models.MenuItem.hasMany(MenuItemModifier, { foreignKey: 'menuItemId' });

    // For enhanced A/B testing and analytics
    models.MenuItemModifier.hasMany(models.MenuItemAnalytics, { foreignKey: 'menuItemModifierId' });
  };

  return MenuItemModifier;
};

