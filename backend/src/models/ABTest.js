module.exports = (sequelize, DataTypes) => {
  const ABTest = sequelize.define('ABTest', {
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    menuItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MenuItems',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    testVariant: {
      type: DataTypes.STRING, // 'A' or 'B'
      allowNull: false,
    },
    variantDescription: {
      type: DataTypes.STRING, // Short description of what is being tested
      allowNull: true,
    },
    testType: {
      type: DataTypes.STRING, // 'image', 'name', 'pricing', 'modifier', or 'other'
      allowNull: false,
    },
    upliftSettings: {
      type: DataTypes.JSONB, // JSON field for uplift settings during the test
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true, // Optional, can be ongoing
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active', // 'active', 'completed', 'paused'
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  ABTest.associate = (models) => {
    ABTest.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });
    ABTest.belongsTo(models.Client, { foreignKey: 'clientId' }); // Ensure tenant isolation

    // Link the test results back to analytics
    ABTest.hasMany(models.MenuItemAnalytics, { foreignKey: 'testId', as: 'analytics' });

    // Link the test to pricing overrides during the test
    ABTest.hasMany(models.LocationMenuOverride, { foreignKey: 'testId', as: 'pricingOverrides' });
  };

  return ABTest;
};
