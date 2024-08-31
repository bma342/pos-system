const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class HouseAccountLocations extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

HouseAccountLocations.attributes = attributes = {
  houseAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'HouseAccounts', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  HouseAccountLocations.init(HouseAccountLocations.attributes, {
    sequelize,
    modelName: 'HouseAccountLocations',
    tableName: 'houseaccountlocationss', // Adjust this if needed
  });
  return HouseAccountLocations
};