const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyTransaction extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyTransaction.attributes = attributes = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  programId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'LoyaltyPrograms', key: 'id' }
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Orders', key: 'id' }
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('earn', 'redeem', 'expire', 'adjust'),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

module.exports = (sequelize) => {
  LoyaltyTransaction.init(LoyaltyTransaction.attributes, {
    sequelize,
    modelName: 'LoyaltyTransaction',
    tableName: 'loyaltytransactions', // Adjust this if needed
  });
  return LoyaltyTransaction
};