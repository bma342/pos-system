module.exports = (sequelize, DataTypes) => {
  const ItemReview = sequelize.define('ItemReview', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5, // Ratings should be between 1 and 5 stars
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional, guests can leave a review without a comment
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guests',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuItems',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    reviewDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  ItemReview.associate = (models) => {
    ItemReview.belongsTo(models.Guest, { foreignKey: 'guestId' });
    ItemReview.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });

    // For easier access to all reviews related to a specific menu item
    models.MenuItem.hasMany(ItemReview, { foreignKey: 'menuItemId' });
  };

  return ItemReview;
};
