const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Refund extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Refund.attributes = attributes = {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Orders', key: 'id' }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processed', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  },
  processedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Users', key: 'id' }
  },
  processedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  refundMethod: {
    type: DataTypes.ENUM('original_payment', 'store_credit', 'bank_transfer'),
    allowNull: false
  }
};

module.exports = (sequelize) => {
  Refund.init(Refund.attributes, {
    sequelize,
    modelName: 'Refund',
    tableName: 'refunds', // Adjust this if needed
  });
  return Refund
};