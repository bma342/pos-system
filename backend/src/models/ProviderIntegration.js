module.exports = (sequelize, DataTypes) => {
  const ProviderIntegration = sequelize.define('ProviderIntegration', {
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  });

  ProviderIntegration.associate = (models) => {
    ProviderIntegration.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return ProviderIntegration;
};
