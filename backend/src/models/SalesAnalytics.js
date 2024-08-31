const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class SalesAnalytics extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

SalesAnalytics.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Locations', key: 'id' }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  totalSales: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  orderCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  averageOrderValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  topSellingItems: {
    type: DataTypes.JSON,
    allowNull: true
  },
  salesByHour: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  SalesAnalytics.init(SalesAnalytics.attributes, {
    sequelize,
    modelName: 'SalesAnalytics',
    tableName: 'salesanalyticss', // Adjust this if needed
  });
  return SalesAnalytics
};