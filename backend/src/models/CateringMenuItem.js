module.exports = (sequelize, DataTypes) => {
  const CateringMenuItem = sequelize.define('CateringMenuItem', {
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Optional image for the item
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Indicate if the item is available
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CateringMenus',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  CateringMenuItem.associate = (models) => {
    CateringMenuItem.belongsTo(models.CateringMenu, { foreignKey: 'menuId' });

    // Add any additional associations, such as with Modifiers, if needed
  };

  return CateringMenuItem;
};
