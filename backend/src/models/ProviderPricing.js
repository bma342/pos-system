const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ProviderPricing extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ProviderPricing.attributes = attributes = {
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Providers', key: 'id' }
  },
  planName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  billingCycle: {
    type: DataTypes.ENUM('monthly', 'yearly', 'per-transaction'),
    allowNull: false
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  ProviderPricing.init(ProviderPricing.attributes, {
    sequelize,
    modelName: 'ProviderPricing',
    tableName: 'providerpricings', // Adjust this if needed
  });
  return ProviderPricing
};