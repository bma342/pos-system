module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING, // 'logo', 'menuItemImage', 'storeImage', etc.
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Asset.associate = (models) => {
    Asset.belongsTo(models.Client, { foreignKey: 'clientId' });
    Asset.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return Asset;
};
