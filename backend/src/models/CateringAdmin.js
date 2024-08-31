const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class CateringAdmin extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

CateringAdmin.attributes = attributes = {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Clients', key: 'id' }
  },
  permissions: {
    type: DataTypes.JSON,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  CateringAdmin.init(CateringAdmin.attributes, {
    sequelize,
    modelName: 'CateringAdmin',
    tableName: 'cateringadmins', // Adjust this if needed
  });
  return CateringAdmin
};