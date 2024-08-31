const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringOrderCustomization extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringOrderCustomization.attributes = attributes = {
  cateringOrderItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'CateringOrderItems', key: 'id' }
  },
  customizationType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customizationValue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  additionalCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  }
};

module.exports = (sequelize) => {
  CateringOrderCustomization.init(CateringOrderCustomization.attributes, {
    sequelize,
    modelName: 'CateringOrderCustomization',
    tableName: 'cateringordercustomizations', // Adjust this if needed
  });
  return CateringOrderCustomization
};