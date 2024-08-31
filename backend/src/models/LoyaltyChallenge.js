const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyChallenge extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyChallenge.attributes = attributes = {
  loyaltyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Loyalties', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('purchase', 'visit', 'referral', 'social', 'custom'),
    allowNull: false
  },
  goal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reward: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Points awarded for completing the challenge'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  LoyaltyChallenge.init(LoyaltyChallenge.attributes, {
    sequelize,
    modelName: 'LoyaltyChallenge',
    tableName: 'loyaltychallenges', // Adjust this if needed
  });
  return LoyaltyChallenge
};