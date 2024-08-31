const { Model, DataTypes } = require('sequelize');

class ABTestVariant extends Model {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      trafficAllocation: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      sequelize,
      modelName: 'ABTestVariant',
      tableName: 'ab_test_variants',
      timestamps: true
    });
  }

  static associate(models) {
    this.belongsTo(models.ABTest, { foreignKey: 'abTestId', as: 'abTest' });
    this.hasMany(models.ABTestMetric, { foreignKey: 'variantId', as: 'metrics' });
  }
}

module.exports = ABTestVariant;