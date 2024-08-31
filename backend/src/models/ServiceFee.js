const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ServiceFee extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ServiceFee.attributes = attributes = {
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
    type: DataTypes.ENUM('fixed', 'percentage'),
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  applicableOrderTypes: {
    type: DataTypes.JSON,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  ServiceFee.init(ServiceFee.attributes, {
    sequelize,
    modelName: 'ServiceFee',
    tableName: 'servicefees', // Adjust this if needed
  });
  return ServiceFee
};