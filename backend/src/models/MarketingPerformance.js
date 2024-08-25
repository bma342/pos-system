module.exports = (sequelize, DataTypes) => {
  const MarketingPerformance = sequelize.define('MarketingPerformance', {
    campaignName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campaignType: {
      type: DataTypes.STRING, // e.g., 'email', 'sms', 'social media', etc.
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    totalSent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Number of messages or ads sent
    },
    totalOpens: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Number of opens (for emails, etc.)
    },
    totalClicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Number of clicks (for ads, links, etc.)
    },
    conversionRate: {
      type: DataTypes.FLOAT,
      allowNull: true, // Calculated field (totalClicks / totalSent)
    },
    totalRevenueGenerated: {
      type: DataTypes.FLOAT,
      allowNull: true, // Revenue attributed to the campaign
    },
    totalSpend: {
      type: DataTypes.FLOAT,
      allowNull: true, // Amount spent on the campaign
    },
    roi: {
      type: DataTypes.FLOAT,
      allowNull: true, // Return on investment (totalRevenueGenerated / totalSpend)
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active', // 'active', 'paused', 'completed'
    },
  });

  MarketingPerformance.associate = (models) => {
    MarketingPerformance.belongsTo(models.Client, { foreignKey: 'clientId' });

    // Optionally link to analytics for deeper insights
    MarketingPerformance.hasMany(models.Analytics, { foreignKey: 'marketingPerformanceId' });

    // Associate with audit logs if needed
    MarketingPerformance.hasMany(models.AuditLog, { foreignKey: 'marketingPerformanceId' });
  };

  // Hook to calculate ROI and conversion rate after updates
  MarketingPerformance.addHook('afterUpdate', async (performance) => {
    if (performance.totalSent > 0) {
      performance.conversionRate = (performance.totalClicks / performance.totalSent) * 100;
    }

    if (performance.totalSpend > 0) {
      performance.roi = (performance.totalRevenueGenerated / performance.totalSpend) * 100;
    }

    await performance.save();
  });

  return MarketingPerformance;
};
