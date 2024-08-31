const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Modifier extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Modifier.attributes = attributes = {
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
    type: DataTypes.ENUM('single', 'multiple'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  Modifier.init(Modifier.attributes, {
    sequelize,
    modelName: 'Modifier',
    tableName: 'modifiers', // Adjust this if needed
  });
  return Modifier
};