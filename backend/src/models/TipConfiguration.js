module.exports = (sequelize, DataTypes) => {
  const TipConfiguration = sequelize.define('TipConfiguration', {
    presetAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    presetPercentage: {
      type: DataTypes.DECIMAL(5, 2),
    },
    customTipAllowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  TipConfiguration.associate = (models) => {
    TipConfiguration.belongsTo(models.Client, { foreignKey: 'clientId' });
    TipConfiguration.belongsTo(models.Location, { foreignKey: 'locationId' });
  };

  return TipConfiguration;
};
