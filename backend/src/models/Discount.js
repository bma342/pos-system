const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Discount extends BaseModel {
  static associate(models) {
    // Define associations here if needed
  }
}

Discount.attributes = attributes = {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  discountType: {
    type: DataTypes.ENUM('percentage', 'fixed'),
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
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
  maxUses: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  currentUses: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Clients',
      key: 'id'
    }
  }
};

module.exports = (sequelize) => {
  Discount.init(Discount.attributes, {
    sequelize,
    modelName: 'Discount',
    tableName: 'discounts', // Adjust this if needed
  });
  return Discount
};