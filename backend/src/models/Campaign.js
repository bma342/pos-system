module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'paused', 'completed'),
      defaultValue: 'draft'
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      }
    }
  });

  Campaign.associate = (models) => {
    Campaign.belongsTo(models.Client, { foreignKey: 'clientId' });
    Campaign.hasMany(models.CampaignResult, { foreignKey: 'campaignId' });
  };

  return Campaign;
};
