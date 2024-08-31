const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MenuBuilderSettings extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MenuBuilderSettings.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  defaultCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'USD'
  },
  allowCustomization: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  maxCategories: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10
  },
  maxItemsPerCategory: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50
  },
  allowSpecialInstructions: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  customSettings: {
    type: DataTypes.JSON,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  MenuBuilderSettings.init(MenuBuilderSettings.attributes, {
    sequelize,
    modelName: 'MenuBuilderSettings',
    tableName: 'menubuildersettingss', // Adjust this if needed
  });
  return MenuBuilderSettings
};