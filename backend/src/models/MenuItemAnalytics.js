const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MenuItemAnalytics extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MenuItemAnalytics.attributes = attributes = {
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuItems', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  orders: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  revenue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  averageRating: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  MenuItemAnalytics.init(MenuItemAnalytics.attributes, {
    sequelize,
    modelName: 'MenuItemAnalytics',
    tableName: 'menuitemanalyticss', // Adjust this if needed
  });
  return MenuItemAnalytics
};