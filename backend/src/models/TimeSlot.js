const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class TimeSlot extends BaseModel {
  static associate(models) {
    // Add associations here if needed
    // For example:
  }
}

TimeSlot.attributes = attributes = {
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  dayOfWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 6
    }
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
};

module.exports = (sequelize) => {
  TimeSlot.init(TimeSlot.attributes, {
    sequelize,
    modelName: 'TimeSlot',
    tableName: 'timeslots', // Adjust this if needed
  });
  return TimeSlot
};