const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Client extends BaseModel {
  static associate(models) {
    // define associations here if needed
  }
}

Client.attributes = attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Add any other fields that are needed for the Client model
};

module.exports = (sequelize) => {
  Client.init(Client.attributes, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients', // Adjust this if needed
  });
  return Client
};