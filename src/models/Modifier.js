module.exports = (sequelize, DataTypes) => {
  const Modifier = sequelize.define('Modifier', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  Modifier.associate = (models) => {
    Modifier.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
  };

  return Modifier;
};
