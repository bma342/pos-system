const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class HouseAccount extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

HouseAccount.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  creditLimit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  billingCycle: {
    type: DataTypes.ENUM('weekly', 'bi-weekly', 'monthly'),
    allowNull: false,
    defaultValue: 'monthly'
  },
  paymentTerms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 30 // days
  }
};

module.exports = (sequelize) => {
  HouseAccount.init(HouseAccount.attributes, {
    sequelize,
    modelName: 'HouseAccount',
    tableName: 'houseaccounts', // Adjust this if needed
  });
  return HouseAccount
};