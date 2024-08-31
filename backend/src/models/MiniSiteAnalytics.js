const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MiniSiteAnalytics extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MiniSiteAnalytics.attributes = attributes = {
  miniSiteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'MiniSites', key: 'id' }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  pageViews: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  uniqueVisitors: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  averageTimeOnSite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Average time on site in seconds'
  },
  bounceRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  conversionRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
};

module.exports = (sequelize) => {
  MiniSiteAnalytics.init(MiniSiteAnalytics.attributes, {
    sequelize,
    modelName: 'MiniSiteAnalytics',
    tableName: 'minisiteanalyticss', // Adjust this if needed
  });
  return MiniSiteAnalytics
};