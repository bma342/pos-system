const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Branding extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Branding.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  primaryColor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  secondaryColor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fontFamily: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customCss: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  Branding.init(Branding.attributes, {
    sequelize,
    modelName: 'Branding',
    tableName: 'brandings', // Adjust this if needed
  });
  return Branding
};