// src/models/LoyaltyChallengeRewards.js
module.exports = (sequelize, DataTypes) => {
  const LoyaltyChallengeReward = sequelize.define('LoyaltyChallengeReward', {
    loyaltyChallengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'LoyaltyChallenges',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    rewardType: {
      type: DataTypes.STRING, // E.g., "Points", "Free Item", "Discount"
      allowNull: false,
    },
    rewardValue: {
      type: DataTypes.JSONB, // Stores the reward details, e.g., { points: 50, item: "Free Coffee", discount: "10% off" }
      allowNull: false,
    },
    redeemed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    redeemedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  LoyaltyChallengeReward.associate = (models) => {
    LoyaltyChallengeReward.belongsTo(models.LoyaltyChallenge, { foreignKey: 'loyaltyChallengeId' });
    LoyaltyChallengeReward.belongsTo(models.Guest, { foreignKey: 'guestId' });
  };

  return LoyaltyChallengeReward;
};
