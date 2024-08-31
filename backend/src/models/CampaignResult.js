const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CampaignResult extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CampaignResult.attributes = attributes = {
  campaignId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Campaigns', key: 'id' }
  },
  metric: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
};

module.exports = (sequelize) => {
  CampaignResult.init(CampaignResult.attributes, {
    sequelize,
    modelName: 'CampaignResult',
    tableName: 'campaignresults', // Adjust this if needed
  });
  return CampaignResult
};