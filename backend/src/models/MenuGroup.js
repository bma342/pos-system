const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MenuGroup extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MenuGroup.attributes = attributes = {
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Menus', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  MenuGroup.init(MenuGroup.attributes, {
    sequelize,
    modelName: 'MenuGroup',
    tableName: 'menugroups', // Adjust this if needed
  });
  return MenuGroup
};