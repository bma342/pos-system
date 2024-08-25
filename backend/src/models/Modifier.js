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
    posModifierId: {
      type: DataTypes.STRING,
      allowNull: true, // For storing specific POS integration IDs
    },
    abTestVariantA: {
      type: DataTypes.STRING,
      allowNull: true, // A/B test variant name A
    },
    abTestVariantB: {
      type: DataTypes.STRING,
      allowNull: true, // A/B test variant name B
    },
    abTestTracking: {
      type: DataTypes.JSONB,
      allowNull: true, // JSON field for tracking A/B test stats
    },
    sizeSliderEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // If the size slider is enabled for this modifier
    },
    sliderOptions: {
      type: DataTypes.JSONB, // JSON to store slider options like {"leftLabel": "Small", "rightLabel": "Large", "steps": 4}
      allowNull: true,
    },
  });

  Modifier.associate = (models) => {
    Modifier.belongsToMany(models.MenuItem, {
      through: models.MenuItemModifier,
      foreignKey: 'modifierId',
      otherKey: 'menuItemId',
    });

    // New association for enhanced reporting and A/B testing
    Modifier.hasMany(models.ABTestResult, { foreignKey: 'modifierId', as: 'abTestResults' });
  };

  return Modifier;
};
