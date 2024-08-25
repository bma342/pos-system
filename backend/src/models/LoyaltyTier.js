module.exports = (sequelize, DataTypes) => {
  const LoyaltyTier = sequelize.define('LoyaltyTier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    pointsRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    benefitsDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    resetPeriod: {
      type: DataTypes.STRING, // 'yearly', 'signup-date', 'quarterly'
      allowNull: false,
    },
    tierRank: {
      type: DataTypes.INTEGER, // Rank or level of the tier, higher numbers indicate higher tiers
      allowNull: false,
    },
    rolloverPoints: {
      type: DataTypes.BOOLEAN, // Indicates whether unused points roll over into the next period
      defaultValue: false,
    },
    maxBenefitsUsage: {
      type: DataTypes.INTEGER, // Limits the number of times tier benefits can be used within the reset period
      allowNull: true,
    },
  });

  LoyaltyTier.associate = (models) => {
    LoyaltyTier.belongsTo(models.Client, { foreignKey: 'clientId', allowNull: false });
    LoyaltyTier.hasMany(models.Guest, { foreignKey: 'loyaltyTierId' }); // Associate with guests who have this tier
    LoyaltyTier.hasMany(models.LoyaltyReward, { foreignKey: 'loyaltyTierId' }); // Link to specific rewards for the tier
  };

  return LoyaltyTier;
};
