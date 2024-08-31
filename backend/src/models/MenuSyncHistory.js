const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class MenuSyncHistory extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

MenuSyncHistory.attributes = attributes = {
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Menus', key: 'id' }
  },
  syncType: {
    type: DataTypes.ENUM('manual', 'automatic', 'scheduled'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('success', 'failed', 'partial'),
    allowNull: false
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  details: {
    type: DataTypes.JSON,
    allowNull: true
  },
  errorMessage: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

module.exports = (sequelize) => {
  MenuSyncHistory.init(MenuSyncHistory.attributes, {
    sequelize,
    modelName: 'MenuSyncHistory',
    tableName: 'menusynchistorys', // Adjust this if needed
  });
  return MenuSyncHistory
};