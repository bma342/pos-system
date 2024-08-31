const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Loyalty extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Loyalty.attributes = attributes = {
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
  pointsPerDollar: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Loyalty.init(Loyalty.attributes, {
    sequelize,
    modelName: 'Loyalty',
    tableName: 'loyaltys', // Adjust this if needed
  });
  return Loyalty
};