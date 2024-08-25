module.exports = (sequelize, DataTypes) => {
  const PricingOverride = sequelize.define('PricingOverride', {
    menuItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MenuItems',
        key: 'id',
      },
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false, // e.g., "DoorDash", "UberEats"
    },
    upliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true, // The percentage increase specific to this provider
    },
    flatOverridePrice: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optionally provide a flat price for this provider
    },
    roundingEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Whether to apply rounding to the final price
    },
    effectiveDateStart: {
      type: DataTypes.DATE,
      allowNull: true, // When the override starts
    },
    effectiveDateEnd: {
      type: DataTypes.DATE,
      allowNull: true, // When the override ends
    },
  });

  PricingOverride.associate = (models) => {
    PricingOverride.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    PricingOverride.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return PricingOverride;
};
