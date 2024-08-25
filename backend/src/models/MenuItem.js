module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define('MenuItem', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    basePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pointsPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    posItemId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isGlobal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if this item is available across all locations
    },
    abTestGroup: {
      type: DataTypes.STRING, // A/B testing group (e.g., 'A', 'B')
      allowNull: true,
    },
    showReviews: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Allows toggling reviews visibility
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicates if this item is featured in menus
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Indicates if the item is available for ordering
    },
    allergens: {
      type: DataTypes.JSONB,
      allowNull: true, // Stores allergen information, e.g., {"gluten": true, "peanuts": false}
    },
    dietaryLabels: {
      type: DataTypes.JSONB,
      allowNull: true, // Stores dietary labels, e.g., {"vegan": true, "halal": false}
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Allows tagging menu items for easier filtering
      allowNull: true,
    },
  });

  MenuItem.associate = (models) => {
    MenuItem.belongsTo(models.MenuGroup, { foreignKey: 'menuGroupId' });
    MenuItem.hasMany(models.LocationMenuOverride, { foreignKey: 'menuItemId' });
    MenuItem.belongsToMany(models.Modifier, {
      through: models.MenuItemModifier,
      foreignKey: 'menuItemId',
      otherKey: 'modifierId',
    });

    MenuItem.hasMany(models.MenuItemModifier, { foreignKey: 'menuItemId' });

    // Associate with size modifiers
    MenuItem.hasMany(models.MenuItemSizeModifier, { foreignKey: 'menuItemId', as: 'sizeModifiers' });

    // Associate with A/B testing
    MenuItem.hasMany(models.ABTest, { foreignKey: 'menuItemId' });

    // Associate with analytics
    MenuItem.hasMany(models.MenuItemAnalytics, { foreignKey: 'menuItemId' });

    // Associate with reviews
    MenuItem.hasMany(models.ItemReview, { foreignKey: 'menuItemId' });

    // Tenant isolation through clientId
    MenuItem.belongsTo(models.Client, { foreignKey: 'clientId' });

    // Associate with external providers (e.g., DoorDash, UberEats)
    MenuItem.belongsToMany(models.ProviderIntegration, {
      through: models.ItemProviderMapping,
      foreignKey: 'menuItemId',
      otherKey: 'providerId',
    });
  };

  return MenuItem;
};
