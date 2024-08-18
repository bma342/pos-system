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
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  CateringMenuItem.associate = (models) => {
    CateringMenuItem.belongsTo(models.CateringMenu, { foreignKey: 'menuId' });
  };

  return CateringMenuItem;
};
