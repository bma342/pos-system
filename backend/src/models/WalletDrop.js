const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class WalletDrop extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

WalletDrop.attributes = attributes = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  walletId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Wallets', key: 'id' }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  dropDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  WalletDrop.init(WalletDrop.attributes, {
    sequelize,
    modelName: 'WalletDrop',
    tableName: 'walletdrops', // Adjust this if needed
  });
  return WalletDrop
};