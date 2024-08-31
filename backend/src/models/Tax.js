const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Tax extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Tax.attributes = attributes = {
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
  type: {
    type: DataTypes.ENUM('sales', 'vat', 'service', 'other'),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  Tax.init(Tax.attributes, {
    sequelize,
    modelName: 'Tax',
    tableName: 'taxs', // Adjust this if needed
  });
  return Tax
};