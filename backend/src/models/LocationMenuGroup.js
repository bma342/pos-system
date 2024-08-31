const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LocationMenuGroup extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LocationMenuGroup.attributes = attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  menuGroupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuGroups', key: 'id' }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  customName: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LocationMenuGroup.init(LocationMenuGroup.attributes, {
    sequelize,
    modelName: 'LocationMenuGroup',
    tableName: 'locationmenugroups', // Adjust this if needed
  });
  return LocationMenuGroup
};