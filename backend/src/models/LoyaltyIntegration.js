const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyIntegration extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyIntegration.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  integrationType: {
    type: DataTypes.ENUM('pos', 'crm', 'email', 'sms', 'other'),
    allowNull: false
  },
  integrationName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  config: {
    type: DataTypes.JSON,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  lastSyncDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LoyaltyIntegration.init(LoyaltyIntegration.attributes, {
    sequelize,
    modelName: 'LoyaltyIntegration',
    tableName: 'loyaltyintegrations', // Adjust this if needed
  });
  return LoyaltyIntegration
};