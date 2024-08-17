module.exports = (sequelize, DataTypes) => {
  const ProviderPricing = sequelize.define('ProviderPricing', {
    provider: {
      type: DataTypes.STRING, // e.g., 'DoorDash', 'UberEats'
      allowNull: false,
    },
    upliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false, // e.g., 18 for 18%
    },
  });

  ProviderPricing.associate = (models) => {
    ProviderPricing.belongsTo(models.LocationMenuOverride, { foreignKey: 'locationMenuOverrideId' });
  };

  return ProviderPricing;
};
