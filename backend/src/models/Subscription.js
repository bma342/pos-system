const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Subscription extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Subscription.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  subscriptionPlanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'SubscriptionPlans', key: 'id' }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'expired', 'suspended'),
    allowNull: false,
    defaultValue: 'active'
  },
  cancelledAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cancelReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  currentPeriodStart: {
    type: DataTypes.DATE,
    allowNull: false
  },
  currentPeriodEnd: {
    type: DataTypes.DATE,
    allowNull: false
  },
  lastBillingDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nextBillingDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Subscription.init(Subscription.attributes, {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscriptions', // Adjust this if needed
  });
  return Subscription
};