const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LocationMenu extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LocationMenu.attributes = attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Menus', key: 'id' }
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
  }
};

module.exports = (sequelize) => {
  LocationMenu.init(LocationMenu.attributes, {
    sequelize,
    modelName: 'LocationMenu',
    tableName: 'locationmenus', // Adjust this if needed
  });
  return LocationMenu
};