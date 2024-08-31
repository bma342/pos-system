const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class Permission extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

Permission.attributes = attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  Permission.init(Permission.attributes, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions', // Adjust this if needed
  });
  return Permission
};