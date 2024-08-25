module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pointsPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    posItemId: {
      type: DataTypes.STRING, // POS system-specific item ID
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
    isAvailableOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Indicates if this item is available for online orders
    },
    abTestGroup: {
      type: DataTypes.STRING, // For A/B testing purposes
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
  });

  Item.associate = (models) => {
    Item.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Item.belongsTo(models.Client, { foreignKey: 'clientId' });
    Item.hasMany(models.Inventory, { foreignKey: 'itemId' });

    // Many-to-many relationship with Modifiers
    Item.belongsToMany(models.Modifier, {
      through: models.ItemModifier,
      foreignKey: 'itemId',
    });

    // A/B testing association for analytics
    Item.hasMany(models.MenuItemAnalytics, { foreignKey: 'itemId' });
  };

  return Item;
};
