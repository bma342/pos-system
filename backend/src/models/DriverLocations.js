const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class DriverLocations extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

DriverLocations.attributes = attributes = {
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'DeliveryDrivers', key: 'id' }
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  accuracy: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  speed: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  bearing: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  DriverLocations.init(DriverLocations.attributes, {
    sequelize,
    modelName: 'DriverLocations',
    tableName: 'driverlocationss', // Adjust this if needed
  });
  return DriverLocations
};