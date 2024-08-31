const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PaymentProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PaymentProfile.attributes = attributes = {
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
  paymentType: {
    type: DataTypes.ENUM('credit_card', 'bank_account', 'paypal', 'other'),
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  lastFour: {
    type: DataTypes.STRING(4),
    allowNull: false
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tokenizedData: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  billingAddress: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  PaymentProfile.init(PaymentProfile.attributes, {
    sequelize,
    modelName: 'PaymentProfile',
    tableName: 'paymentprofiles', // Adjust this if needed
  });
  return PaymentProfile
};