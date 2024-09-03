const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Order extends BaseModel {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      clientId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      customerId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'),
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Order'
    });
  }

  static associate(models) {
    this.hasMany(models.OrderItem, { foreignKey: 'orderId' });
  }
}

module.exports = Order;