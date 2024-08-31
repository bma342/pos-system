const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Inventory extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Inventory.attributes = attributes = {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  menuItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MenuItems', key: 'id' }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reorderPoint: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  lastRestockDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Inventory.init(Inventory.attributes, {
    sequelize,
    modelName: 'Inventory',
    tableName: 'inventorys', // Adjust this if needed
  });
  return Inventory
};