const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class StaffSchedule extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

StaffSchedule.attributes = attributes = {
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Staff', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
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
  isRecurring: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  StaffSchedule.init(StaffSchedule.attributes, {
    sequelize,
    modelName: 'StaffSchedule',
    tableName: 'staffschedules', // Adjust this if needed
  });
  return StaffSchedule
};