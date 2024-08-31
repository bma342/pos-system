const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CampaignStep extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CampaignStep.attributes = {
  // Define attributes here
};

module.exports = (sequelize) => {
  CampaignStep.init(CampaignStep.attributes, {
    sequelize,
    modelName: 'CampaignStep',
    tableName: 'campaignsteps', // Adjust this if needed
  });
  return CampaignStep
};