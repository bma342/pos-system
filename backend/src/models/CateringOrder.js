const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringOrder extends BaseModel {
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
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      eventType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false
      },
      specialInstructions: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'CateringOrder'
    });
  }

  static associate(models) {
    this.hasMany(models.CateringOrderItem, { foreignKey: 'orderId' });
  }
}

module.exports = CateringOrder;