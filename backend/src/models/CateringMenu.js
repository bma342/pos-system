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
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  CateringMenu.associate = (models) => {
    CateringMenu.belongsTo(models.Client, { foreignKey: 'clientId', onDelete: 'CASCADE' });
    CateringMenu.hasMany(models.CateringMenuItem, { foreignKey: 'menuId', onDelete: 'CASCADE' });
    CateringMenu.belongsToMany(models.Location, {
      through: 'CateringMenuLocations',
      foreignKey: 'menuId',
    });
  };

  return CateringMenu;
};
