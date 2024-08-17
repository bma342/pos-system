module.exports = (sequelize, DataTypes) => {
  const GlobalMenu = sequelize.define('GlobalMenu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  GlobalMenu.associate = (models) => {
    GlobalMenu.hasMany(models.MenuGroup, { foreignKey: 'globalMenuId' });
    models.MenuGroup.belongsTo(GlobalMenu, { foreignKey: 'globalMenuId' });
  };

  return GlobalMenu;
};
