const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CorePOSProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CorePOSProfile.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  posType: {
    type: DataTypes.ENUM('Toast', 'Square', 'Clover', 'Other'),
    allowNull: false
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
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  CorePOSProfile.init(CorePOSProfile.attributes, {
    sequelize,
    modelName: 'CorePOSProfile',
    tableName: 'coreposprofiles', // Adjust this if needed
  });
  return CorePOSProfile
};