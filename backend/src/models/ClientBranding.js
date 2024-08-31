const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ClientBranding extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ClientBranding.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clients',
      key: 'id'
    }
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
  ClientBranding.init(ClientBranding.attributes, {
    sequelize,
    modelName: 'ClientBranding',
    tableName: 'clientbrandings', // Adjust this if needed
  });
  return ClientBranding
};