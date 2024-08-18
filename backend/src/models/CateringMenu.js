module.exports = (sequelize, DataTypes) => {
  const CateringMenu = sequelize.define('CateringMenu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  CateringMenu.associate = (models) => {
    CateringMenu.belongsTo(models.Client, { foreignKey: 'clientId' });
    CateringMenu.hasMany(models.CateringMenuItem, { foreignKey: 'menuId' });
  };

  return CateringMenu;
};
