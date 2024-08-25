module.exports = (sequelize, DataTypes) => {
  const LoyaltyChallenge = sequelize.define('LoyaltyChallenge', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    conditions: {
      type: DataTypes.JSONB, // Define conditions like { itemCount: 10, timeframe: '1 month', minSpend: 50 }
      allowNull: false,
    },
    rewardConfig: {
      type: DataTypes.JSONB, // Define rewards like { reward: "Free Smoothie", points: 100, discount: 10% }
      allowNull: false,
    },
    challengeType: {
      type: DataTypes.STRING, // e.g., 'purchase-based', 'engagement-based'
      allowNull: false,
      defaultValue: 'purchase-based',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active', // Could be 'active', 'completed', 'archived'
    },
    participantCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
  });

  LoyaltyChallenge.associate = (models) => {
    LoyaltyChallenge.belongsTo(models.Location, { foreignKey: 'locationId' });
    LoyaltyChallenge.belongsTo(models.Client, { foreignKey: 'clientId' });
    LoyaltyChallenge.hasMany(models.LoyaltyReward, { foreignKey: 'loyaltyChallengeId' });
    LoyaltyChallenge.hasMany(models.LoyaltyChallengeProgress, { foreignKey: 'loyaltyChallengeId' });
  };

  return LoyaltyChallenge;
};

