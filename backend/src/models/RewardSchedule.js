const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class RewardSchedule extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

RewardSchedule.attributes = attributes = {
  rewardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Rewards', key: 'id' }
  },
  dayOfWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 6
    }
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  RewardSchedule.init(RewardSchedule.attributes, {
    sequelize,
    modelName: 'RewardSchedule',
    tableName: 'rewardschedules', // Adjust this if needed
  });
  return RewardSchedule
};