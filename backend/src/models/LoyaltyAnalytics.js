module.exports = (sequelize, DataTypes) => {
  const LoyaltyAnalytics = sequelize.define('LoyaltyAnalytics', {
    loyaltyProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'LoyaltyPrograms',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    totalPointsIssued: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    totalPointsRedeemed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    totalRewardsIssued: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    totalSpendFromRewards: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    activeMembers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    churnRate: {
      type: DataTypes.FLOAT,
      allowNull: true, // Calculated field based on user activity
    },
    engagementScore: {
      type: DataTypes.FLOAT,
      allowNull: true, // Custom metric that factors in points earned, rewards claimed, and member activity
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  LoyaltyAnalytics.associate = (models) => {
    LoyaltyAnalytics.belongsTo(models.LoyaltyProgram, { foreignKey: 'loyaltyProgramId' });
    LoyaltyAnalytics.belongsTo(models.Client, { foreignKey: 'clientId' });

    // Optionally, link to audit logs
    LoyaltyAnalytics.hasMany(models.AuditLog, { foreignKey: 'loyaltyAnalyticsId' });
  };

  return LoyaltyAnalytics;
};
