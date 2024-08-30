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
      defaultValue: false,
    },
    abTestGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    showReviews: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      },
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    allergens: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    dietaryLabels: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  }, {
    tableName: 'MenuItems',
    timestamps: true,
  });

  MenuItem.associate = (models) => {
    MenuItem.belongsTo(models.MenuGroup, { foreignKey: 'menuGroupId', constraints: false });
    MenuItem.hasMany(models.LocationMenuOverride, { foreignKey: 'menuItemId', constraints: false });
    MenuItem.belongsToMany(models.Modifier, {
      through: 'MenuItemModifier',
      foreignKey: 'menuItemId',
      otherKey: 'modifierId',
      constraints: false
    });
    MenuItem.hasMany(models.MenuItemModifier, { foreignKey: 'menuItemId', constraints: false });
    MenuItem.hasMany(models.MenuItemSizeModifier, { foreignKey: 'menuItemId', as: 'sizeModifiers', constraints: false });
    MenuItem.hasMany(models.ABTest, { foreignKey: 'menuItemId', constraints: false });
    MenuItem.hasMany(models.MenuItemAnalytics, { foreignKey: 'menuItemId', constraints: false });
    MenuItem.hasMany(models.ItemReview, { foreignKey: 'menuItemId', constraints: false });
    MenuItem.belongsTo(models.Client, { foreignKey: 'clientId', constraints: false });
    MenuItem.belongsToMany(models.ProviderIntegration, {
      through: 'ItemProviderMapping',
      foreignKey: 'menuItemId',
      otherKey: 'providerId',
      constraints: false
    });
  };

  return MenuItem;
};
