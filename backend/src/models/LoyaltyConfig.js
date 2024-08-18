module.exports = (sequelize, DataTypes) => {
  const LoyaltyConfig = sequelize.define('LoyaltyConfig', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    tierName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tierThreshold: {
      type: DataTypes.INTEGER,
      allowNull: false, // Points required to reach this tier
    },
    pointsPerDollar: {
      type: DataTypes.FLOAT,
      defaultValue: 1.0, // Points earned per dollar spent
    },
    reward: {
      type: DataTypes.JSONB, // Configurable rewards, e.g., { discount: 10, freeItem: "Smoothie" }
      allowNull: true,
    },
    brandablePointsName: {
      type: DataTypes.STRING,
      defaultValue: 'Points',
    },
    doublePointsDays: {
      type: DataTypes.JSONB, // Example: { start: "2024-09-01", end: "2024-09-07", locations: ["Store1", "Store2"] }
      allowNull: true,
    },
  });

  LoyaltyConfig.associate = (models) => {
    LoyaltyConfig.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return LoyaltyConfig;
};
