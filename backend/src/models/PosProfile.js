const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class PosProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

PosProfile.attributes = attributes = {
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
  accessToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tokenExpiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  PosProfile.init(PosProfile.attributes, {
    sequelize,
    modelName: 'PosProfile',
    tableName: 'posprofiles', // Adjust this if needed
  });
  return PosProfile
};