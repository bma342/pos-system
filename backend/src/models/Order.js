const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Order extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Order.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tip: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  orderType: {
    type: DataTypes.ENUM('dine-in', 'takeout', 'delivery'),
    allowNull: false
  },
  specialInstructions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
};

module.exports = (sequelize) => {
  Order.init(Order.attributes, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders', // Adjust this if needed
  });
  return Order
};