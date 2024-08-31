const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LocationHours extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LocationHours.attributes = attributes = {
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
  openTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  closeTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  isClosed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
};

module.exports = (sequelize) => {
  LocationHours.init(LocationHours.attributes, {
    sequelize,
    modelName: 'LocationHours',
    tableName: 'locationhourss', // Adjust this if needed
  });
  return LocationHours
};