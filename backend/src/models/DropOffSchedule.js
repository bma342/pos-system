const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class DropOffSchedule extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

DropOffSchedule.attributes = attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  dropOffSpotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'DropOffSpots', key: 'id' }
  },
  dayOfWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 6 }
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
  DropOffSchedule.init(DropOffSchedule.attributes, {
    sequelize,
    modelName: 'DropOffSchedule',
    tableName: 'dropoffschedules', // Adjust this if needed
  });
  return DropOffSchedule
};