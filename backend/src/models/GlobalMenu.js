const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class GlobalMenu extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

GlobalMenu.attributes = attributes = {
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
  }
};

module.exports = (sequelize) => {
  GlobalMenu.init(GlobalMenu.attributes, {
    sequelize,
    modelName: 'GlobalMenu',
    tableName: 'globalmenus', // Adjust this if needed
  });
  return GlobalMenu
};