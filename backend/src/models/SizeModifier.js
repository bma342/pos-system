const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class SizeModifier extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

SizeModifier.attributes = attributes = {
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
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  SizeModifier.init(SizeModifier.attributes, {
    sequelize,
    modelName: 'SizeModifier',
    tableName: 'sizemodifiers', // Adjust this if needed
  });
  return SizeModifier
};