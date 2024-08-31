const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MenuAnalytics extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MenuAnalytics.attributes = attributes = {
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Menus', key: 'id' }
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
  averageOrderValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  }
};

module.exports = (sequelize) => {
  MenuAnalytics.init(MenuAnalytics.attributes, {
    sequelize,
    modelName: 'MenuAnalytics',
    tableName: 'menuanalyticss', // Adjust this if needed
  });
  return MenuAnalytics
};