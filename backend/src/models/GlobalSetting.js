const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class GlobalSetting extends BaseModel {
  static associate(models) {
    // Global settings typically don't have associations, but you can add if needed
  }
}

GlobalSetting.attributes = attributes = {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dataType: {
    type: DataTypes.ENUM('string', 'number', 'boolean', 'json'),
    allowNull: false,
    defaultValue: 'string'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isEditable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  GlobalSetting.init(GlobalSetting.attributes, {
    sequelize,
    modelName: 'GlobalSetting',
    tableName: 'globalsettings', // Adjust this if needed
  });
  return GlobalSetting
};