const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyChallengeRewards extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyChallengeRewards.attributes = attributes = {
  challengeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'LoyaltyChallenges', key: 'id' }
  },
  rewardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'LoyaltyRewards', key: 'id' }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
};

module.exports = (sequelize) => {
  LoyaltyChallengeRewards.init(LoyaltyChallengeRewards.attributes, {
    sequelize,
    modelName: 'LoyaltyChallengeRewards',
    tableName: 'loyaltychallengerewardss', // Adjust this if needed
  });
  return LoyaltyChallengeRewards
};