module.exports = (sequelize, DataTypes) => {
  const MenuAnalytics = sequelize.define('MenuAnalytics', {
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuItems',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    addToCartRate: {
      type: DataTypes.FLOAT,
      allowNull: true, // Percentage of views that convert to "Add to Cart"
    },
    purchaseRate: {
      type: DataTypes.FLOAT,
      allowNull: true, // Percentage of "Add to Cart" that convert to purchase
    },
    averageSpend: {
      type: DataTypes.FLOAT,
      allowNull: true, // Average spend for this item
    },
    abTestGroup: {
      type: DataTypes.STRING, // 'A' or 'B' for A/B testing groups
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  MenuAnalytics.associate = (models) => {
    MenuAnalytics.belongsTo(models.MenuItem, { foreignKey: 'menuItemId', onDelete: 'CASCADE' });
  };

  return MenuAnalytics;
};
