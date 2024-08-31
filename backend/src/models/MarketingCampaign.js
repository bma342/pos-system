const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MarketingCampaign extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MarketingCampaign.attributes = attributes = {
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
    type: DataTypes.ENUM('email', 'sms', 'push', 'social', 'other'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'scheduled', 'active', 'paused', 'completed'),
    allowNull: false,
    defaultValue: 'draft'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  targetAudience: {
    type: DataTypes.JSON,
    allowNull: true
  },
  content: {
    type: DataTypes.JSON,
    allowNull: true
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
};

module.exports = (sequelize) => {
  MarketingCampaign.init(MarketingCampaign.attributes, {
    sequelize,
    modelName: 'MarketingCampaign',
    tableName: 'marketingcampaigns', // Adjust this if needed
  });
  return MarketingCampaign
};