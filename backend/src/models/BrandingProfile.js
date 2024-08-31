const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class BrandingProfile extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

BrandingProfile.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  colorScheme: {
    type: DataTypes.JSON,
    allowNull: true
  },
  fontSettings: {
    type: DataTypes.JSON,
    allowNull: true
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
};

module.exports = (sequelize) => {
  BrandingProfile.init(BrandingProfile.attributes, {
    sequelize,
    modelName: 'BrandingProfile',
    tableName: 'brandingprofiles', // Adjust this if needed
  });
  return BrandingProfile
};