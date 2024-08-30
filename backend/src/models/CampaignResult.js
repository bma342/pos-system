module.exports = (sequelize, DataTypes) => {
  const CampaignResult = sequelize.define('CampaignResult', {
    campaignId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Campaigns',
        key: 'id'
      }
    },
    impressions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    conversions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    revenue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });

  CampaignResult.associate = (models) => {
    if (models.Campaign) {
      CampaignResult.belongsTo(models.Campaign, { foreignKey: 'campaignId' });
    }
  };

  return CampaignResult;
};
