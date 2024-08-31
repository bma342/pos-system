const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Challenge extends BaseModel {
  static associate(models) {
    // define associations here if needed
  }
}

Challenge.attributes = attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reward: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

module.exports = (sequelize) => {
  Challenge.init(Challenge.attributes, {
    sequelize,
    modelName: 'Challenge',
    tableName: 'challenges', // Adjust this if needed
  });
  return Challenge
};