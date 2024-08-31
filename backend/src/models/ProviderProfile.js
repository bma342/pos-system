const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ProviderProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ProviderProfile.attributes = attributes = {
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Providers', key: 'id' }
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  supportEmail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  supportPhone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  technicalContactName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  technicalContactEmail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serviceAreas: {
    type: DataTypes.JSON,
    allowNull: true
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  ProviderProfile.init(ProviderProfile.attributes, {
    sequelize,
    modelName: 'ProviderProfile',
    tableName: 'providerprofiles', // Adjust this if needed
  });
  return ProviderProfile
};