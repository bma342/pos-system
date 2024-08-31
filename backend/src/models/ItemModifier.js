const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ItemModifier extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ItemModifier.attributes = attributes = {
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Items', key: 'id' }
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
  }
};

module.exports = (sequelize) => {
  ItemModifier.init(ItemModifier.attributes, {
    sequelize,
    modelName: 'ItemModifier',
    tableName: 'itemmodifiers', // Adjust this if needed
  });
  return ItemModifier
};