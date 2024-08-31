const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CommissaryKitchen extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CommissaryKitchen.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  operatingHours: {
    type: DataTypes.JSON,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  CommissaryKitchen.init(CommissaryKitchen.attributes, {
    sequelize,
    modelName: 'CommissaryKitchen',
    tableName: 'commissarykitchens', // Adjust this if needed
  });
  return CommissaryKitchen
};