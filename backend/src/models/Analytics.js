module.exports = (sequelize, DataTypes) => {
  const Analytics = sequelize.define('Analytics', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    reportId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MarketingReports', // Connects to the MarketingReport table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    metricType: {
      type: DataTypes.STRING, // 'menuImageABTest', 'itemNameABTest', 'discountPerformance', etc.
      allowNull: false,
    },
    testGroup: {
      type: DataTypes.STRING, // 'A', 'B', or other identifiers
      allowNull: true,
    },
    metricName: {
      type: DataTypes.STRING, // For custom metrics tracking
      allowNull: false,
    },
    metricValue: {
      type: DataTypes.FLOAT, // Value of the metric, e.g., conversion rate, CTR, etc.
      allowNull: false,
    },
    totalImpressions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    totalConversions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    totalRevenue: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    conversionRate: {
      type: DataTypes.FLOAT,
      allowNull: true, // Auto-calculated field (totalConversions / totalImpressions)
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Analytics.associate = (models) => {
    Analytics.belongsTo(models.Client, { foreignKey: 'clientId' });
    Analytics.belongsTo(models.MarketingReport, { foreignKey: 'reportId' });

    // Associations for deeper tracking
    Analytics.belongsTo(models.MenuItem, { foreignKey: 'menuItemId', allowNull: true });
    Analytics.belongsTo(models.Modifier, { foreignKey: 'modifierId', allowNull: true });
  };

  // Hook to auto-calculate conversion rate after updates
  Analytics.addHook('afterUpdate', async (analytics) => {
    if (analytics.totalImpressions > 0) {
      analytics.conversionRate = (analytics.totalConversions / analytics.totalImpressions) * 100;
      await analytics.save();
    }
  });

  return Analytics;
};
