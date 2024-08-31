const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class OrderProvider extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

OrderProvider.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Providers', key: 'id' }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: true
  },
  apiSecret: {
    type: DataTypes.STRING,
    allowNull: true
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true
  },
  lastSyncDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  OrderProvider.init(OrderProvider.attributes, {
    sequelize,
    modelName: 'OrderProvider',
    tableName: 'orderproviders', // Adjust this if needed
  });
  return OrderProvider
};