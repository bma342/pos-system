module.exports = (sequelize, DataTypes) => {
  const CampaignResult = sequelize.define('CampaignResult', {
    successCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    failureCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    openRate: {
      type: DataTypes.FLOAT, // For email campaigns, percentage of emails opened
      allowNull: true,
    },
    clickThroughRate: {
      type: DataTypes.FLOAT, // For email or SMS campaigns, percentage of links clicked
      allowNull: true,
    },
    conversionRate: {
      type: DataTypes.FLOAT, // Percentage of conversions (e.g., purchases made after clicking)
      allowNull: true,
    },
    responseData: {
      type: DataTypes.JSONB, // Stores detailed response data (e.g., user interactions)
      allowNull: true,
    },
    marketingCampaignId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MarketingCampaigns',
        key: 'id',
      },
      allowNull: false,
    },
  });

  CampaignResult.associate = (models) => {
    CampaignResult.belongsTo(models.MarketingCampaign, { foreignKey: 'marketingCampaignId' });
  };

  return CampaignResult;
};
