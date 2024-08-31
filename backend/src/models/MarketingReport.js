const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MarketingReport extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MarketingReport.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  campaignId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'MarketingCampaigns', key: 'id' }
  },
  reportType: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'campaign'),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  metrics: {
    type: DataTypes.JSON,
    allowNull: false
  },
  insights: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recommendations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  generatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
};

module.exports = (sequelize) => {
  MarketingReport.init(MarketingReport.attributes, {
    sequelize,
    modelName: 'MarketingReport',
    tableName: 'marketingreports', // Adjust this if needed
  });
  return MarketingReport
};