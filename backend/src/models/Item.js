const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Item extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Item.attributes = attributes = {
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
  category: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Item.init(Item.attributes, {
    sequelize,
    modelName: 'Item',
    tableName: 'items', // Adjust this if needed
  });
  return Item
};