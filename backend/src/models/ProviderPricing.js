const { DataTypes } = require('sequelize');
const { roundToNext99 } = require('../utils/pricingUtils'); // Import the rounding utility

module.exports = (sequelize) => {
  const ProviderPricing = sequelize.define('ProviderPricing', {
    provider: {
      type: DataTypes.STRING, // e.g., 'DoorDash', 'UberEats'
      allowNull: false,
    },
    upliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false, // e.g., 18 for 18%
    },
    shouldRound: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // The default is not to round
    },
    roundedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true, // Stores the rounded price if rounding is enabled
    },
  }, {
    hooks: {
      beforeCreate: (providerPricing) => {
        const upliftPercentage = providerPricing.getDataValue('upliftPercentage');
        const shouldRound = providerPricing.getDataValue('shouldRound');

        if (shouldRound) {
          providerPricing.setDataValue('roundedPrice', roundToNext99(upliftPercentage));
        }
      },
      beforeUpdate: (providerPricing) => {
        const upliftPercentage = providerPricing.getDataValue('upliftPercentage');
        const shouldRound = providerPricing.getDataValue('shouldRound');

        if (shouldRound) {
          providerPricing.setDataValue('roundedPrice', roundToNext99(upliftPercentage));
        }
      },
    },
  });

  // Associations
  ProviderPricing.associate = (models) => {
    ProviderPricing.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
  };

  return ProviderPricing;
};

