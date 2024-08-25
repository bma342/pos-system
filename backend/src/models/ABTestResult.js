module.exports = (sequelize, DataTypes) => {
  const ABTestResult = sequelize.define('ABTestResult', {
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testGroup: {
      type: DataTypes.STRING, // 'A', 'B', or another variant identifier
      allowNull: false,
    },
    conversions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    revenueGenerated: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      allowNull: false,
    },
    impressions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    conversionRate: {
      type: DataTypes.FLOAT,
      allowNull: true, // Calculated as (conversions / impressions) * 100
    },
    dateRangeStart: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dateRangeEnd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    modifierId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional, used if tracking modifiers
      references: {
        model: 'Modifiers',
        key: 'id',
      },
    },
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional, used if tracking menu items
      references: {
        model: 'MenuItems',
        key: 'id',
      },
    },
  });

  ABTestResult.associate = (models) => {
    if (models.Modifier) {
      ABTestResult.belongsTo(models.Modifier, { foreignKey: 'modifierId' });
    }
    if (models.MenuItem) {
      ABTestResult.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    }
  };

  // Hook to auto-calculate conversion rate after updating results
  ABTestResult.addHook('afterUpdate', async (result) => {
    if (result.impressions > 0) {
      result.conversionRate = (result.conversions / result.impressions) * 100;
      await result.save();
    }
  });

  return ABTestResult;
};
