const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MenuItemSizeModifier extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MenuItemSizeModifier.attributes = attributes = {
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuItems', key: 'id' }
  },
  sizeModifierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'SizeModifiers', key: 'id' }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
};

module.exports = (sequelize) => {
  MenuItemSizeModifier.init(MenuItemSizeModifier.attributes, {
    sequelize,
    modelName: 'MenuItemSizeModifier',
    tableName: 'menuitemsizemodifiers', // Adjust this if needed
  });
  return MenuItemSizeModifier
};