module.exports = (sequelize, DataTypes) => {
  const LoyaltyIntegration = sequelize.define('LoyaltyIntegration', {
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  });

  LoyaltyIntegration.associate = (models) => {
    LoyaltyIntegration.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return LoyaltyIntegration;
};
