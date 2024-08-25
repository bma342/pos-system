module.exports = (sequelize, DataTypes) => {
  const CampaignStep = sequelize.define('CampaignStep', {
    stepType: {
      type: DataTypes.STRING, // e.g., 'email', 'sms', 'pushNotification'
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending', // 'pending', 'inProgress', 'completed'
    },
    scheduledTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    executedTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT, // Stores the message or email content
      allowNull: false,
    },
    audienceSegment: {
      type: DataTypes.JSONB, // Stores any specific audience targeting details for this step
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

  CampaignStep.associate = (models) => {
    CampaignStep.belongsTo(models.MarketingCampaign, { foreignKey: 'marketingCampaignId' });
  };

  return CampaignStep;
};
