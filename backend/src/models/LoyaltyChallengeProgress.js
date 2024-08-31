const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyChallengeProgress extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyChallengeProgress.attributes = attributes = {
  challengeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'LoyaltyChallenges', key: 'id' }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LoyaltyChallengeProgress.init(LoyaltyChallengeProgress.attributes, {
    sequelize,
    modelName: 'LoyaltyChallengeProgress',
    tableName: 'loyaltychallengeprogresss', // Adjust this if needed
  });
  return LoyaltyChallengeProgress
};