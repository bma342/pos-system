const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MiniSite extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MiniSite.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subdomain: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'default'
  },
  customDomain: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  settings: {
    type: DataTypes.JSON,
    allowNull: true
  },
  seoSettings: {
    type: DataTypes.JSON,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
};

module.exports = (sequelize) => {
  MiniSite.init(MiniSite.attributes, {
    sequelize,
    modelName: 'MiniSite',
    tableName: 'minisites', // Adjust this if needed
  });
  return MiniSite
};