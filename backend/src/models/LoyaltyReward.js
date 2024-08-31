const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyReward extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyReward.attributes = attributes = {
  programId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'LoyaltyPrograms', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pointsCost: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rewardType: {
    type: DataTypes.ENUM('discount', 'freeItem', 'giftCard', 'other'),
    allowNull: false
  },
  rewardValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  expirationDays: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LoyaltyReward.init(LoyaltyReward.attributes, {
    sequelize,
    modelName: 'LoyaltyReward',
    tableName: 'loyaltyrewards', // Adjust this if needed
  });
  return LoyaltyReward
};