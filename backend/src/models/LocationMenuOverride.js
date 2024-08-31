const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LocationMenuOverride extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LocationMenuOverride.attributes = attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuItems', key: 'id' }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  customName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LocationMenuOverride.init(LocationMenuOverride.attributes, {
    sequelize,
    modelName: 'LocationMenuOverride',
    tableName: 'locationmenuoverrides', // Adjust this if needed
  });
  return LocationMenuOverride
};