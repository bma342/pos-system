module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Location.associate = (models) => {
    Location.belongsTo(models.Client, { foreignKey: 'clientId' });
    Location.hasMany(models.PosIntegration, { foreignKey: 'locationId' });
    Location.hasMany(models.LoyaltyIntegration, { foreignKey: 'locationId' });
    Location.hasMany(models.ProviderIntegration, { foreignKey: 'locationId' });
  };

  return Location;
};
