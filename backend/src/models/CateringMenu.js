const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringMenu extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringMenu.attributes = attributes = {
  cateringId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Caterings', key: 'id' }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  CateringMenu.init(CateringMenu.attributes, {
    sequelize,
    modelName: 'CateringMenu',
    tableName: 'cateringmenus', // Adjust this if needed
  });
  return CateringMenu
};