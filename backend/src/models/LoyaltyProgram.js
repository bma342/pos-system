const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyProgram extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyProgram.attributes = attributes = {
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
  rules: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  LoyaltyProgram.init(LoyaltyProgram.attributes, {
    sequelize,
    modelName: 'LoyaltyProgram',
    tableName: 'loyaltyprograms', // Adjust this if needed
  });
  return LoyaltyProgram
};