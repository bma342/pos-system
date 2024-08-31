const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PricingUplift extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PricingUplift.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Locations', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('percentage', 'fixed'),
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  appliesTo: {
    type: DataTypes.ENUM('all', 'category', 'item'),
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Categories', key: 'id' }
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'MenuItems', key: 'id' }
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
  }
};

module.exports = (sequelize) => {
  PricingUplift.init(PricingUplift.attributes, {
    sequelize,
    modelName: 'PricingUplift',
    tableName: 'pricinguplifts', // Adjust this if needed
  });
  return PricingUplift
};