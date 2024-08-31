const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Category extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Category.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Category.init(Category.attributes, {
    sequelize,
    modelName: 'Category',
    tableName: 'categorys', // Adjust this if needed
  });
  return Category
};