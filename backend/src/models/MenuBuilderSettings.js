module.exports = (sequelize, DataTypes) => {
  const MenuBuilderSettings = sequelize.define('MenuBuilderSettings', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    defaultCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },
    allowGlobalMenus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Whether menus can be globally assigned to all locations
    },
    menuGroupingOptions: {
      type: DataTypes.JSONB, // Options for grouping menus (e.g., by location, category)
      allowNull: true,
    },
    maxItemsPerMenu: {
      type: DataTypes.INTEGER,
      defaultValue: 100, // Define the maximum number of items allowed in a single menu
    },
    defaultMenuImage: {
      type: DataTypes.STRING, // URL or path for the default menu image
      allowNull: true,
    },
    enableMenuCopying: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Allow the ability to copy menus, groups, or items
    },
    roundingOption: {
      type: DataTypes.ENUM('none', 'up', 'down', 'nearest'),
      defaultValue: 'none', // Default rounding for menu prices
    },
    pricingUpliftDefault: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0, // Default pricing uplift for new menus or groups
    },
  });

  MenuBuilderSettings.associate = (models) => {
    MenuBuilderSettings.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return MenuBuilderSettings;
};
