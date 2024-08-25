module.exports = (sequelize, DataTypes) => {
  const MiniSiteAnalytics = sequelize.define('MiniSiteAnalytics', {
    miniSiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MiniSites',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    pageViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    uniqueVisitors: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    averageSessionDuration: {
      type: DataTypes.FLOAT, // In seconds
      allowNull: true,
    },
    bounceRate: {
      type: DataTypes.FLOAT, // Percentage of visitors who leave after viewing one page
      allowNull: true,
    },
    conversionRate: {
      type: DataTypes.FLOAT, // Percentage of visitors who complete a goal (like placing an order)
      allowNull: true,
    },
    goalCompletions: {
      type: DataTypes.INTEGER, // Number of goals completed (e.g., orders placed)
      defaultValue: 0,
      allowNull: false,
    },
    revenueGenerated: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    trackingPeriodStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    trackingPeriodEnd: {
      type: DataTypes.DATE,
      allowNull: true, // Optional end date for the tracking period
    },
  });

  MiniSiteAnalytics.associate = (models) => {
    MiniSiteAnalytics.belongsTo(models.MiniSite, { foreignKey: 'miniSiteId' });

    // Optionally link to marketing performance for holistic reporting
    MiniSiteAnalytics.belongsTo(models.MarketingPerformance, { foreignKey: 'marketingPerformanceId', allowNull: true });

    // Associate with audit logs for tracking
    MiniSiteAnalytics.hasMany(models.AuditLog, { foreignKey: 'miniSiteAnalyticsId' });
  };

  // Hook to calculate bounce rate and conversion rate
  MiniSiteAnalytics.addHook('afterUpdate', async (analytics) => {
    if (analytics.pageViews > 0) {
      analytics.bounceRate = ((analytics.pageViews - analytics.goalCompletions) / analytics.pageViews) * 100;
      analytics.conversionRate = (analytics.goalCompletions / analytics.pageViews) * 100;
    }

    await analytics.save();
  });

  return MiniSiteAnalytics;
};
