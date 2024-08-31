const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyConfig extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyConfig.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  pointsPerDollar: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1
  },
  pointsExpirationMonths: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tierSystem: {
    type: DataTypes.JSON,
    allowNull: true
  },
  bonusRules: {
    type: DataTypes.JSON,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  LoyaltyConfig.init(LoyaltyConfig.attributes, {
    sequelize,
    modelName: 'LoyaltyConfig',
    tableName: 'loyaltyconfigs', // Adjust this if needed
  });
  return LoyaltyConfig
};