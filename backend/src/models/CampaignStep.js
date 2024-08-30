module.exports = (sequelize, DataTypes) => {
  const CampaignStep = sequelize.define('CampaignStep', {
    campaignId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Campaigns',
        key: 'id'
      }
    },
    stepNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stepType: {
      type: DataTypes.ENUM('email', 'sms', 'push_notification'),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    delayDays: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  CampaignStep.associate = (models) => {
    CampaignStep.belongsTo(models.Campaign, { foreignKey: 'campaignId' });
  };

  return CampaignStep;
};
