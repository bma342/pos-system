const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringOrderModifier extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringOrderModifier.attributes = attributes = {
  cateringOrderItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CateringOrderItems', key: 'id' }
  },
  modifierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Modifiers', key: 'id' }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
};

module.exports = (sequelize) => {
  CateringOrderModifier.init(CateringOrderModifier.attributes, {
    sequelize,
    modelName: 'CateringOrderModifier',
    tableName: 'cateringordermodifiers', // Adjust this if needed
  });
  return CateringOrderModifier
};