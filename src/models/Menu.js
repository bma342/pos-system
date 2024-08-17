module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Menu.associate = (models) => {
    Menu.belongsTo(models.Client, { foreignKey: 'clientId' });
    Menu.hasMany(models.MenuGroup, { foreignKey: 'menuId' }); // Updated association
  };

  return Menu;
};
