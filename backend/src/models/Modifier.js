const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Modifier extends BaseModel {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      orderItemId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Modifier'
    });
  }

  static associate(models) {
    this.belongsTo(models.OrderItem, { foreignKey: 'orderItemId' });
  }
}

module.exports = Modifier;