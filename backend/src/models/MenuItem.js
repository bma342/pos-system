const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MenuItem extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MenuItem.attributes = attributes = {
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Menus', key: 'id' }
  },
  menuGroupId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'MenuGroups', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  calories: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  allergens: {
    type: DataTypes.JSON,
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
};

module.exports = (sequelize) => {
  MenuItem.init(MenuItem.attributes, {
    sequelize,
    modelName: 'MenuItem',
    tableName: 'menuitems', // Adjust this if needed
  });
  return MenuItem
};