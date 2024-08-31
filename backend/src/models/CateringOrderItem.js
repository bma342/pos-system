const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringOrderItem extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringOrderItem.attributes = attributes = {
  cateringOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CateringOrders', key: 'id' }
  },
  cateringMenuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CateringMenuItems', key: 'id' }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  specialInstructions: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  CateringOrderItem.init(CateringOrderItem.attributes, {
    sequelize,
    modelName: 'CateringOrderItem',
    tableName: 'cateringorderitems', // Adjust this if needed
  });
  return CateringOrderItem
};