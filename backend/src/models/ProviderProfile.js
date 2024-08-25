'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProviderProfile = sequelize.define('ProviderProfile', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiBaseUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flatUpliftPercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    roundingOption: {
      type: DataTypes.ENUM('none', '.99', '.49', 'nearest'),
      defaultValue: '.99',
    },
  });

  ProviderProfile.associate = (models) => {
    ProviderProfile.belongsTo(models.Client, { foreignKey: 'clientId' });
    ProviderProfile.hasMany(models.Location, { foreignKey: 'providerProfileId' });
  };

  return ProviderProfile;
};
