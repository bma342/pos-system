const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringOrder extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringOrder.attributes = attributes = {
  cateringId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Caterings', key: 'id' }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  deliveryDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  specialInstructions: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  CateringOrder.init(CateringOrder.attributes, {
    sequelize,
    modelName: 'CateringOrder',
    tableName: 'cateringorders', // Adjust this if needed
  });
  return CateringOrder
};