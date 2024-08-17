module.exports = (sequelize, DataTypes) => {
  const PosIntegration = sequelize.define('PosIntegration', {
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

  PosIntegration.associate = (models) => {
    PosIntegration.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return PosIntegration;
};
