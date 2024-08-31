const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Report extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Report.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('sales', 'inventory', 'customer', 'financial', 'custom'),
    allowNull: false
  },
  parameters: {
    type: DataTypes.JSON,
    allowNull: true
  },
  schedule: {
    type: DataTypes.JSON,
    allowNull: true
  },
  lastRunAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  Report.init(Report.attributes, {
    sequelize,
    modelName: 'Report',
    tableName: 'reports', // Adjust this if needed
  });
  return Report
};