const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
    type: DataTypes.ENUM('GUEST', 'CLIENT_ADMIN', 'GLOBAL_ADMIN', 'EMPLOYEE'),
    allowNull: false,
    defaultValue: 'GUEST',
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

module.exports = User;