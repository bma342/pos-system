const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MarketingPerformance extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MarketingPerformance.attributes = attributes = {
  campaignId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MarketingCampaigns', key: 'id' }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  impressions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  clicks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  conversions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  revenue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  roi: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  MarketingPerformance.init(MarketingPerformance.attributes, {
    sequelize,
    modelName: 'MarketingPerformance',
    tableName: 'marketingperformances', // Adjust this if needed
  });
  return MarketingPerformance
};