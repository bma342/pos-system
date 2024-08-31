const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');
const { UserRole } = require('../types/enums');

class User extends BaseModel {
  static associate(models) {
    // Define associations here if needed
  }

  static modelAttributes(DataTypes) {
    return {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: Object.values(UserRole),
        defaultValue: UserRole.USER,
      },
    };
  }
}

module.exports = User;