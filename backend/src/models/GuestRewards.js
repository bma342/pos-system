module.exports = (sequelize, DataTypes) => {
  const GuestRewards = sequelize.define('GuestRewards', {
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    rewardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'LoyaltyRewards',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    pointsUsed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Points used to claim the reward
    },
    dateClaimed: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Date when the reward was claimed
    },
    isRedeemed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if the reward has been redeemed
    },
    redeemedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Date when the reward was redeemed
    },
  });

  GuestRewards.associate = (models) => {
    GuestRewards.belongsTo(models.Guest, { foreignKey: 'guestId' });
    GuestRewards.belongsTo(models.LoyaltyReward, { foreignKey: 'rewardId' });

    // Optional association for tracking orders linked to the reward redemption
    GuestRewards.belongsTo(models.Order, { foreignKey: 'orderId', allowNull: true });
  };

  return GuestRewards;
};
