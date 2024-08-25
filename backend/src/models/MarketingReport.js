module.exports = (sequelize, DataTypes) => {
  const MarketingReport = sequelize.define('MarketingReport', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    reportName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reportType: {
      type: DataTypes.STRING, // 'abTest', 'discountPerformance', 'loyaltyPerformance', etc.
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true, // Optional end date for ongoing reports
    },
    filters: {
      type: DataTypes.JSONB, // Store any filters applied to the report (e.g., by location, menu item, etc.)
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active', // 'active', 'completed', 'archived'
    },
    totalRevenue: {
      type: DataTypes.FLOAT,
      allowNull: true, // Aggregated revenue for the report period
    },
    totalImpressions: {
      type: DataTypes.INTEGER,
      allowNull: true, // Aggregated impressions for the report period
    },
    totalConversions: {
      type: DataTypes.INTEGER,
      allowNull: true, // Aggregated conversions for the report period
    },
  });

  MarketingReport.associate = (models) => {
    MarketingReport.belongsTo(models.Client, { foreignKey: 'clientId' });
    MarketingReport.hasMany(models.Analytics, { foreignKey: 'reportId' });

    // Optional association for audit logging
    MarketingReport.hasMany(models.AuditLog, { foreignKey: 'reportId' });
  };

  return MarketingReport;
};
