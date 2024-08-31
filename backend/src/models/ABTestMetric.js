const { Model, DataTypes } = require('sequelize');

class ABTestMetric extends Model {
  static init(sequelize) {
    super.init({
      abTestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ABTests',
          key: 'id'
        }
      },
      variantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ABTestVariants',
          key: 'id'
        }
      },
      metricName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      metricValue: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    }, {
      sequelize,
      modelName: 'ABTestMetric',
      tableName: 'ab_test_metrics',
      timestamps: true
    });
  }

  static associate(models) {
    if (models.ABTest) {
      this.belongsTo(models.ABTest, { foreignKey: 'abTestId', as: 'abTest' });
    }
    if (models.ABTestVariant) {
      this.belongsTo(models.ABTestVariant, { foreignKey: 'variantId', as: 'variant' });
    }
  }
}

module.exports = ABTestMetric;