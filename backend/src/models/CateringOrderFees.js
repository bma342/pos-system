const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringOrderFees extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringOrderFees.attributes = attributes = {
  cateringOrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CateringOrders', key: 'id' }
  },
  feeType: {
    type: DataTypes.ENUM('delivery', 'service', 'other'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  CateringOrderFees.init(CateringOrderFees.attributes, {
    sequelize,
    modelName: 'CateringOrderFees',
    tableName: 'cateringorderfeess', // Adjust this if needed
  });
  return CateringOrderFees
};