const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MenuItemModifier extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MenuItemModifier.attributes = attributes = {
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuItems', key: 'id' }
  },
  modifierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Modifiers', key: 'id' }
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  minSelection: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  maxSelection: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
};

module.exports = (sequelize) => {
  MenuItemModifier.init(MenuItemModifier.attributes, {
    sequelize,
    modelName: 'MenuItemModifier',
    tableName: 'menuitemmodifiers', // Adjust this if needed
  });
  return MenuItemModifier
};