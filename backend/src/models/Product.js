const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Product extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Product.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Categories', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  attributes: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Product.init(Product.attributes, {
    sequelize,
    modelName: 'Product',
    tableName: 'products', // Adjust this if needed
  });
  return Product
};