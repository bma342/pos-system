const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Campaign extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Campaign.attributes = attributes = {
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
  status: {
    type: DataTypes.ENUM('draft', 'active', 'paused', 'completed'),
    defaultValue: 'draft'
  },
  type: {
    type: DataTypes.ENUM('email', 'sms', 'push', 'in-app'),
    allowNull: false
  },
  targetAudience: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Campaign.init(Campaign.attributes, {
    sequelize,
    modelName: 'Campaign',
    tableName: 'campaigns', // Adjust this if needed
  });
  return Campaign
};