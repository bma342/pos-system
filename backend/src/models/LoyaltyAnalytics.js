const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class LoyaltyAnalytics extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

LoyaltyAnalytics.attributes = attributes = {
  loyaltyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Loyalties', key: 'id' }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  totalPointsEarned: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  totalPointsRedeemed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  activeUsers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  newEnrollments: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
};

module.exports = (sequelize) => {
  LoyaltyAnalytics.init(LoyaltyAnalytics.attributes, {
    sequelize,
    modelName: 'LoyaltyAnalytics',
    tableName: 'loyaltyanalyticss', // Adjust this if needed
  });
  return LoyaltyAnalytics
};