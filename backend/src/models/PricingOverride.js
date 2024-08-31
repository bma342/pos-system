const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PricingOverride extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PricingOverride.attributes = attributes = {
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuItems', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  PricingOverride.init(PricingOverride.attributes, {
    sequelize,
    modelName: 'PricingOverride',
    tableName: 'pricingoverrides', // Adjust this if needed
  });
  return PricingOverride
};