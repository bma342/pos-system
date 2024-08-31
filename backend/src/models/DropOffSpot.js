const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class DropOffSpot extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

DropOffSpot.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  DropOffSpot.init(DropOffSpot.attributes, {
    sequelize,
    modelName: 'DropOffSpot',
    tableName: 'dropoffspots', // Adjust this if needed
  });
  return DropOffSpot
};