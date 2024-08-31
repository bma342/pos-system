const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class ClientSettings extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

ClientSettings.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clients',
      key: 'id'
    }
  },
  settingKey: {
    type: DataTypes.STRING,
    allowNull: false
  },
  settingValue: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dataType: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

module.exports = (sequelize) => {
  ClientSettings.init(ClientSettings.attributes, {
    sequelize,
    modelName: 'ClientSettings',
    tableName: 'clientsettingss', // Adjust this if needed
  });
  return ClientSettings
};