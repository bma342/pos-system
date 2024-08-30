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
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    testVariant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variantDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    testType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upliftSettings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'ABTests',
    timestamps: true,
  });

  ABTest.associate = (models) => {
    ABTest.belongsTo(models.MenuItem, { foreignKey: 'menuItemId', onDelete: 'CASCADE', constraints: false });
    ABTest.belongsTo(models.Client, { foreignKey: 'clientId', onDelete: 'CASCADE', constraints: false });
    ABTest.hasMany(models.MenuItemAnalytics, { foreignKey: 'testId', as: 'analytics', constraints: false });
    ABTest.hasMany(models.LocationMenuOverride, { foreignKey: 'testId', as: 'pricingOverrides', constraints: false });
  };

  return ABTest;
};
