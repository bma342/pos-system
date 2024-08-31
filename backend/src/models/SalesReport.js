const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class SalesReport extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

SalesReport.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Locations', key: 'id' }
  },
  reportDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  reportType: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
    allowNull: false
  },
  totalSales: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  totalOrders: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  averageOrderValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  topSellingItems: {
    type: DataTypes.JSON,
    allowNull: true
  },
  salesByCategory: {
    type: DataTypes.JSON,
    allowNull: true
  },
  salesByHour: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  SalesReport.init(SalesReport.attributes, {
    sequelize,
    modelName: 'SalesReport',
    tableName: 'salesreports', // Adjust this if needed
  });
  return SalesReport
};