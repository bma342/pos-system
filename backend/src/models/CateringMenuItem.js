const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringMenuItem extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringMenuItem.attributes = attributes = {
  cateringMenuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CateringMenus', key: 'id' }
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuItems', key: 'id' }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  minimumQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  maximumQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  CateringMenuItem.init(CateringMenuItem.attributes, {
    sequelize,
    modelName: 'CateringMenuItem',
    tableName: 'cateringmenuitems', // Adjust this if needed
  });
  return CateringMenuItem
};