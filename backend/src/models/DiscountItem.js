const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class DiscountItem extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

DiscountItem.attributes = attributes = {
  discountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Discounts', key: 'id' }
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuItems', key: 'id' }
  },
  isExcluded: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
};

module.exports = (sequelize) => {
  DiscountItem.init(DiscountItem.attributes, {
    sequelize,
    modelName: 'DiscountItem',
    tableName: 'discountitems', // Adjust this if needed
  });
  return DiscountItem
};