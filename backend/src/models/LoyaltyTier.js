module.exports = (sequelize, DataTypes) => {
  const LoyaltyTier = sequelize.define('LoyaltyTier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pointsRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rewardDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brandingOptions: {
      type: DataTypes.JSONB,
      allowNull: true, // Custom branding options like colors, images, etc.
    },
  });

  LoyaltyTier.associate = (models) => {
    LoyaltyTier.hasMany(models.Guest, { foreignKey: 'loyaltyTierId' });
  };

  return LoyaltyTier;
};
