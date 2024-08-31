const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class OrderHistory extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

OrderHistory.attributes = attributes = {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Orders', key: 'id' }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Users', key: 'id' }
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
};

module.exports = (sequelize) => {
  OrderHistory.init(OrderHistory.attributes, {
    sequelize,
    modelName: 'OrderHistory',
    tableName: 'orderhistorys', // Adjust this if needed
  });
  return OrderHistory
};