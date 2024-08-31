const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltySubscription extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltySubscription.attributes = attributes = {
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
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'paused', 'cancelled'),
    allowNull: false,
    defaultValue: 'active'
  },
  currentPoints: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  currentTier: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LoyaltySubscription.init(LoyaltySubscription.attributes, {
    sequelize,
    modelName: 'LoyaltySubscription',
    tableName: 'loyaltysubscriptions', // Adjust this if needed
  });
  return LoyaltySubscription
};