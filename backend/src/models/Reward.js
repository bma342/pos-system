const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Reward extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Reward.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
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
    type: DataTypes.ENUM('discount', 'freeItem', 'points', 'other'),
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
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
  },
  usageLimit: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Reward.init(Reward.attributes, {
    sequelize,
    modelName: 'Reward',
    tableName: 'rewards', // Adjust this if needed
  });
  return Reward
};