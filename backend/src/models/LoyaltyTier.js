const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyTier extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyTier.attributes = attributes = {
  programId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'LoyaltyPrograms', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  requiredPoints: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  benefits: {
    type: DataTypes.JSON,
    allowNull: true
  },
  multiplier: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  LoyaltyTier.init(LoyaltyTier.attributes, {
    sequelize,
    modelName: 'LoyaltyTier',
    tableName: 'loyaltytiers', // Adjust this if needed
  });
  return LoyaltyTier
};