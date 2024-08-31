const { Model, DataTypes } = require('sequelize');

class ABTest extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM('DRAFT', 'RUNNING', 'COMPLETED', 'CANCELLED'),
        defaultValue: 'DRAFT'
      }
    }, {
      sequelize,
      modelName: 'ABTest',
      tableName: 'ab_tests',
      timestamps: true
    });
  }

  static associate(models) {
    this.hasMany(models.ABTestVariant, { foreignKey: 'abTestId', as: 'variants' });
    this.hasMany(models.ABTestMetric, { foreignKey: 'abTestId', as: 'metrics' });
  }
}

module.exports = ABTest;