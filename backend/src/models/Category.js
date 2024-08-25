module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
    },
  });

  Category.associate = (models) => {
    Category.belongsTo(models.Client, { foreignKey: 'clientId' });
    Category.hasMany(models.Item, { foreignKey: 'categoryId' });
  };

  return Category;
};
