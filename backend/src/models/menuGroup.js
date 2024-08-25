module.exports = (sequelize, DataTypes) => {
  const MenuGroup = sequelize.define('MenuGroup', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  MenuGroup.associate = (models) => {
    MenuGroup.belongsTo(models.Menu, { foreignKey: 'menuId' });
    MenuGroup.hasMany(models.MenuItem, { foreignKey: 'menuGroupId' });
  };

  return MenuGroup;
};
