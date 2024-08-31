const { DataTypes } = require('sequelize');
const BaseModel = require('./BaseModel');

class HouseAccountUser extends BaseModel {
  static associate(models) {
    // Define associations here
  }
}

HouseAccountUser.attributes = attributes = {
  houseAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'HouseAccounts', key: 'id' }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Users', key: 'id' }
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  },
  spendingLimit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
};

module.exports = (sequelize) => {
  HouseAccountUser.init(HouseAccountUser.attributes, {
    sequelize,
    modelName: 'HouseAccountUser',
    tableName: 'houseaccountusers', // Adjust this if needed
  });
  return HouseAccountUser
};