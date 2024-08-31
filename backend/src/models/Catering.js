const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Catering extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Catering.attributes = attributes = {
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
  minimumOrderAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  leadTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Lead time in hours'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  Catering.init(Catering.attributes, {
    sequelize,
    modelName: 'Catering',
    tableName: 'caterings', // Adjust this if needed
  });
  return Catering
};