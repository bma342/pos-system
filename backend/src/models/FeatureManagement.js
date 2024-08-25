module.exports = (sequelize, DataTypes) => {
  const FeatureManagement = sequelize.define('FeatureManagement', {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loyaltyEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    orderAggregationEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    onlineOrderingEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reportingEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  FeatureManagement.associate = (models) => {
    FeatureManagement.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return FeatureManagement;
};
