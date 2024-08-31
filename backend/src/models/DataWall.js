const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class DataWall extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

DataWall.attributes = attributes = {
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
  dataSource: {
    type: DataTypes.STRING,
    allowNull: false
  },
  queryParameters: {
    type: DataTypes.JSON,
    allowNull: true
  },
  refreshInterval: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3600 // in seconds
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  lastRefreshed: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  DataWall.init(DataWall.attributes, {
    sequelize,
    modelName: 'DataWall',
    tableName: 'datawalls', // Adjust this if needed
  });
  return DataWall
};