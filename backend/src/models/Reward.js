module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING, // 'discount', 'free-item', 'points'
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: true, // Value associated with the reward (e.g., discount percentage, points)
    },
    conditions: {
      type: DataTypes.JSONB, // Store reward conditions like minimum spend, required items, etc.
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true, // Optional expiration date for the reward
    },
    isGlobal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Whether the reward applies across all locations
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
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active', // 'active', 'expired', 'redeemed'
    },
  });

  Reward.associate = (models) => {
    Reward.belongsTo(models.Client, { foreignKey: 'clientId' });
    Reward.belongsToMany(models.Guest, {
      through: 'GuestRewards',
      foreignKey: 'rewardId',
      otherKey: 'guestId',
    });

    // Associate with specific orders if the reward is applied
    Reward.hasMany(models.Order, { foreignKey: 'rewardId', allowNull: true });

    // Link rewards to loyalty tiers for advanced programs
    Reward.belongsTo(models.LoyaltyTier, { foreignKey: 'loyaltyTierId', allowNull: true });
  };

  return Reward;
};
