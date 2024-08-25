module.exports = (sequelize, DataTypes) => {
  const MenuItemAnalytics = sequelize.define('MenuItemAnalytics', {
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuItems',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    menuId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Menus',
        key: 'id',
      },
      allowNull: true,
    },
    salesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    totalRevenue: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    averageOrderSize: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    abTestVariant: {
      type: DataTypes.STRING, // 'A' or 'B', tracks which variant is being tested
      allowNull: true,
    },
    imageVariant: {
      type: DataTypes.STRING, // Tracks which image variant is being shown
      allowNull: true,
    },
    variantSalesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    variantTotalRevenue: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    totalViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false, // Total number of times this item has been viewed
    },
    conversionRate: {
      type: DataTypes.FLOAT,
      allowNull: true, // Calculated field (salesCount / totalViews)
    },
    dateRangeStart: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dateRangeEnd: {
      type: DataTypes.DATE,
      allowNull: true,
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

  MenuItemAnalytics.associate = (models) => {
    MenuItemAnalytics.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    MenuItemAnalytics.belongsTo(models.Menu, { foreignKey: 'menuId' }); // Additional association for analytics tied to a menu
    MenuItemAnalytics.belongsTo(models.Client, { foreignKey: 'clientId' });

    // Association for AB testing
    MenuItemAnalytics.belongsTo(models.ABTest, { foreignKey: 'abTestId' });

    // Association for Mini-Site analytics
    MenuItemAnalytics.belongsTo(models.MiniSite, { foreignKey: 'miniSiteId' });
  };

  // Hook to calculate conversion rate
  MenuItemAnalytics.addHook('afterUpdate', async (analytics) => {
    if (analytics.totalViews > 0) {
      analytics.conversionRate = (analytics.salesCount / analytics.totalViews) * 100;
      await analytics.save();
    }
  });

  return MenuItemAnalytics;
};
