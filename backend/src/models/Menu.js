const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Menu extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Menu.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
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
  },
  type: {
    type: DataTypes.ENUM('regular', 'seasonal', 'special'),
    allowNull: false,
    defaultValue: 'regular'
  }
};

module.exports = (sequelize) => {
  Menu.init(Menu.attributes, {
    sequelize,
    modelName: 'Menu',
    tableName: 'menus', // Adjust this if needed
  });
  return Menu
};