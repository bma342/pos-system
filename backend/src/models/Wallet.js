const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Wallet extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Wallet.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  Wallet.init(Wallet.attributes, {
    sequelize,
    modelName: 'Wallet',
    tableName: 'wallets', // Adjust this if needed
  });
  return Wallet
};