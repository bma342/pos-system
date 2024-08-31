const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Tenant extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Tenant.attributes = attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subdomain: {
    type: DataTypes.STRING,
    allowNull: false,
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
  plan: {
    type: DataTypes.STRING,
    allowNull: false
  },
  billingEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  technicalContactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  }
};

module.exports = (sequelize) => {
  Tenant.init(Tenant.attributes, {
    sequelize,
    modelName: 'Tenant',
    tableName: 'tenants', // Adjust this if needed
  });
  return Tenant
};