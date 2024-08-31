const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Transaction extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Transaction.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  Transaction.init(Transaction.attributes, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions', // Adjust this if needed
  });
  return Transaction
};