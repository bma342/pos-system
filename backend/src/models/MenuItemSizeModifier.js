module.exports = (sequelize, DataTypes) => {
  const MenuItemSizeModifier = sequelize.define('MenuItemSizeModifier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    basePriceAdjustment: {
      type: DataTypes.FLOAT,
      allowNull: true, // Adjusts the base price based on size selection
      defaultValue: 0.0,
    },
    pointsPriceAdjustment: {
      type: DataTypes.INTEGER,
      allowNull: true, // Adjusts the points price based on size selection
      defaultValue: 0,
    },
    vanityName: {
      type: DataTypes.STRING, // Optional vanity name (e.g., "Grande" instead of "Large")
      allowNull: true,
    },
    sliderPosition: {
      type: DataTypes.INTEGER, // Determines where the size falls on the slider (e.g., 1 for small, 5 for extra-large)
      allowNull: false,
      validate: {
        min: 1,
        max: 5, // Assuming the slider has 5 positions
      },
    },
  });

  MenuItemSizeModifier.associate = (models) => {
    MenuItemSizeModifier.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    MenuItemSizeModifier.belongsTo(models.Client, { foreignKey: 'clientId' }); // Ensures tenant isolation
  };

  return MenuItemSizeModifier;
};
