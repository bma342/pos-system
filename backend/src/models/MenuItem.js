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
      type: DataTypes.INTEGER, // Use integer for points
      allowNull: true,
    },
  });

  MenuItem.associate = (models) => {
    MenuItem.belongsTo(models.Menu, { foreignKey: 'menuId' });
    MenuItem.hasMany(models.LocationMenuOverride, { foreignKey: 'menuItemId' });
  };

  return MenuItem;
};
