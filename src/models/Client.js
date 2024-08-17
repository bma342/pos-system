module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Client.associate = (models) => {
    Client.hasMany(models.Location, { foreignKey: 'clientId' });
  };

  return Client;
};
