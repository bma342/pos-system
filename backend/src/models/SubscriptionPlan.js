const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class SubscriptionPlan extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

SubscriptionPlan.attributes = attributes = {
  name: {
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
    type: DataTypes.ENUM('monthly', 'quarterly', 'yearly'),
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
  trialPeriodDays: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  maxLocations: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  maxUsers: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  SubscriptionPlan.init(SubscriptionPlan.attributes, {
    sequelize,
    modelName: 'SubscriptionPlan',
    tableName: 'subscriptionplans', // Adjust this if needed
  });
  return SubscriptionPlan
};