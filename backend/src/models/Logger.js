const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Logger extends BaseModel {
  static associate(models) {
    // Define associations here if needed
  }
}

Logger.attributes = attributes = {
  level: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  meta: {
    type: DataTypes.JSON,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Logger.init(Logger.attributes, {
    sequelize,
    modelName: 'Logger',
    tableName: 'loggers', // Adjust this if needed
  });
  return Logger
};