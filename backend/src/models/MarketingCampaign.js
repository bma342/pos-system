module.exports = (sequelize, DataTypes) => {
  const MarketingCampaign = sequelize.define('MarketingCampaign', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    campaignType: {
      type: DataTypes.STRING, // e.g., 'email', 'sms', 'loyalty', 'a/bTest'
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active', // 'active', 'completed', 'scheduled'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true, // Optional end date for ongoing campaigns
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional budget tracking
    },
    targetAudience: {
      type: DataTypes.JSONB, // Store segmentation details (e.g., {"ageRange": "18-35", "loyaltyLevel": "Gold"})
      allowNull: true,
    },
    reportId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reports',
        key: 'id',
      },
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      allowNull: true, // Optional, as some campaigns may be client-wide
    },
  });

  MarketingCampaign.associate = (models) => {
    MarketingCampaign.belongsTo(models.Client, { foreignKey: 'clientId' });
    MarketingCampaign.belongsTo(models.Location, { foreignKey: 'locationId' });
    MarketingCampaign.belongsTo(models.Report, { foreignKey: 'reportId' });

    // A campaign can have multiple execution steps (e.g., emails, SMS, etc.)
    MarketingCampaign.hasMany(models.CampaignStep, { foreignKey: 'campaignId' });
  };

  return MarketingCampaign;
};
